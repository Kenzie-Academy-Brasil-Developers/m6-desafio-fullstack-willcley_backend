import { Request, Response } from "express";
import { Email } from "../entities/index";
import {
    createEmailService,
    readEmailService,
    updateEmailService,
    deleteEmailService,
} from "../services/emails.service";
import { TReadEmail, TReturnEmail } from "../interfaces/emails.interfaces";

export const createEmailController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const email: TReturnEmail = await createEmailService(req.body);
    return res.status(201).json(email);
};

export const readEmailController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const emails: TReadEmail = await readEmailService();
    return res.status(200).json(emails);
};

export const updateEmailController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const { email } = res.locals;
    const emailUpdated: TReturnEmail = await updateEmailService(req.body, email);

    return res.status(200).json(emailUpdated);
};

export const deleteEmailController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const { email, client } = res.locals;
    await deleteEmailService(email, client.id);
    return res.status(204).json();
};