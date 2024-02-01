import "dotenv/config";
import AppError from "../errors/AppErrors.error";
import { compare } from "bcryptjs";
import { Client, Email } from "../entities/index";
import { TLogin, TLoginReturn } from "../interfaces/emails.interfaces";
import { clientRepo, emailRepo } from "../repositories";
import { sign } from "jsonwebtoken";
import { sessionReturn } from "../schemas/emails.schemas";

export const loginService = async (
    data: TLogin
): Promise<TLoginReturn> => {
    const { email, password } = data;
    const clientEmail: Email | null = await emailRepo.findOneBy({email});
    if (!clientEmail) throw new AppError("Invalid credentials.", 401);

    const comparePassword = await compare(
        password,
        clientEmail.password
    );
    if (!comparePassword) throw new AppError("Invalid credentials.", 401);

    const client: Client | null = await clientRepo.findOneBy({
        emails: clientEmail
    });
    if (!client) throw new AppError("Client not found.", 404);

    const token: string = sign(
        { userName: client.fullname },
        process.env.SECRET_KEY!,
        { subject: client.id, expiresIn: process.env.EXPIRES_IN! }
    );

    return sessionReturn.parse({ token, client });
};