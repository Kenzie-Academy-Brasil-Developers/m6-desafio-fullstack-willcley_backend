import "dotenv/config";
import AppError from "../errors/AppErrors.error";
import { compare } from "bcryptjs";
import { Email } from "../entities/index";
import { TLogin, TLoginReturn } from "../interfaces/emails.interfaces";
import { emailRepo } from "../repositories";
import { sign } from "jsonwebtoken";

export const loginService = async (
    data: TLogin
): Promise<TLoginReturn> => {
    const { email } = data;
    const clientEmail: Email | null = await emailRepo.findOneBy({email});
    if (!clientEmail) throw new AppError("Invalid credentials", 401);

    const comparePassword = await compare(
        data.password,
        clientEmail.password
    );
    if (!comparePassword) throw new AppError("Invalid credentials", 401);

    const token: string = sign(
        { email: clientEmail.email },
        process.env.SECRET_KEY!,
        {
            subject: clientEmail.client.id.toString(),
            expiresIn: process.env.EXPIRES_IN!,
        }
    );

    return { token };
};