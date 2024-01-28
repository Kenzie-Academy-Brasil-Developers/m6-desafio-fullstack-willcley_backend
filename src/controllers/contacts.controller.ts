import { Request, Response } from "express";
import { Contact } from "../entities/index";
import {
    createContactService,
    readContactService,
    updateContactService,
    deleteContactService,
} from "../services/contacts.service";

export const createContactController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const contact: Contact = await createContactService(req.body);
    return res.status(201).json(contact);
};

export const readContactController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const contacts: Contact[] = await readContactService();
    return res.status(200).json(contacts);
};

export const updateContactController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const { contact } = res.locals;
    const updatedContact: Contact = await updateContactService(req.body, contact);

    return res.status(200).json(updatedContact);
};

export const deleteContactController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const { contact } = res.locals;
    await deleteContactService(contact);

    return res.status(204).json();
};