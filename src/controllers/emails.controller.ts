import { Request, Response } from "express";
import {
    createEmailService,
    deleteClientEmailService,
    updateClientEmailService,
} from "../services/emails.service";
import { TReturnEmail } from "../interfaces/emails.interfaces";

export const createEmailController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const { client } = res.locals;
    const email: TReturnEmail = await createEmailService({...req.body, client});
    return res.status(201).json(email);
};

export const readClientEmailController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const { client } = res.locals;
    return res.status(200).json(client.emails);
};

export const updateClientEmailController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const { email, client } = res.locals;
    const emailUpdated: TReturnEmail = await updateClientEmailService(
        req.body,
        email,
        client,
    );

    return res.status(200).json(emailUpdated);
};

export const deleteClientEmailController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const { email } = res.locals;
    await deleteClientEmailService(email);
    return res.status(204).json();
};