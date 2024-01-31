import AppError from "../errors/AppErrors.error";
import { Client, Email } from "../entities/index";
import {
    TReturnEmail,
    TCreateEmail,
    TUpdateEmail,
} from "../interfaces/emails.interfaces";
import { returnEmailSchema } from "../schemas/emails.schemas";
import { clientRepo, emailRepo } from "../repositories";
import { hash } from "bcryptjs";

export const createEmailService = async (
    data: TCreateEmail
): Promise<TReturnEmail> => {
    const { email, password, client } = data;
    const foundEmail = await emailRepo.findOneBy({ email })
    if (foundEmail) throw new AppError("Email already exists.", 409);

    const foundClient: Client | null = await clientRepo.findOneBy({ id: client.id });
    if (!foundClient) throw new AppError("Client not found.", 404);

    const hashedPassword = await hash(password, 10);
    const emailCreated: Email = await emailRepo.save({
        ...data,
        password: hashedPassword,
        client: client,
    });

    return returnEmailSchema.parse(emailCreated);
};

export const updateClientEmailService = async (
    data: TUpdateEmail,
    email: Email,
    client: Client
): Promise<TReturnEmail> => {
    let { password } = data;
    password = await hash(password, 10);

    const emailUpdated: Email = await emailRepo.save({
        ...email,
        password,
        client
    });

    return returnEmailSchema.parse(emailUpdated);
};

export const deleteClientEmailService = async (email: Email): Promise<void> => {
    await emailRepo.remove(email);
};