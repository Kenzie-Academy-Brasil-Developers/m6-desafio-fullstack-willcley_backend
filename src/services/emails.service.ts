import AppError from "../errors/AppErrors.error";
import { Client, Email } from "../entities/index";
import {
    TReturnEmail,
    TCreateEmail,
    TReadEmail,
    TUpdateEmail,
} from "../interfaces/emails.interfaces";
import {
    returnEmailSchema,
    readEmailSchema,
    updateEmailSchema,
} from "../schemas/emails.schemas";
import { clientRepo, emailRepo } from "../repositories";
import { hash } from "bcryptjs";

export const createEmailService = async (
    data: TCreateEmail
): Promise<TReturnEmail> => {
    const { email, password } = data;
    const foundEmail = await emailRepo.findOneBy({ email })
    if (foundEmail) throw new AppError("Email already exists.", 409);

    const hashedPassword = await hash(password, 10);
    const emailCreated: Email = await emailRepo.save({
        ...data,
        hashedPassword,
    });

    return returnEmailSchema.parse(emailCreated);
};

export const getEmailService = async (
    id: string
): Promise<TReturnEmail> => {
    const email: Email | null = await emailRepo.findOneBy({ id });

    if (!email) throw new AppError("Email not found.", 404);

    return returnEmailSchema.parse(email);
};

export const readEmailService = async (): Promise<TReadEmail> => {
    const emails: Email[] = await emailRepo.find();
    return readEmailSchema.parse(emails);
};

export const updateEmailService = async (
    data: TUpdateEmail,
    email: Email
): Promise<TReturnEmail> => {
    const { password } = data;
    const hashedPassword = hash(password, 10);

    const emailUpdated: Email = await emailRepo.save({
        ...email,
        hashedPassword,
    });

    return returnEmailSchema.parse(emailUpdated);
};

export const deleteEmailService = async (
    email: Email,
    clientId: string,
): Promise<void> => {
    const client: Client | null = await clientRepo.findOne({
        where: { id: clientId },
        relations: { emails: true },
    });
    if (!client) throw new AppError("Client not found.", 404);;

    const emails: Email[] = client.emails;
    if (!emails[1]) throw new AppError(
        "You need to have at least one email address in your account.",
        401
    );

    await emailRepo.remove(email);
};