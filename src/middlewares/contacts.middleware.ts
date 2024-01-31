import AppError from "../errors/AppErrors.error";
import { NextFunction, Request, Response } from "express";
import { Contact } from "../entities/index";
import { contactRepo } from "../repositories";

export const verifyContactExists = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { contactId } = req.params;
    const contact: Contact | null= await contactRepo.findOneBy({
        id: contactId
    });

    if (!contact) throw new AppError("Contact not found.", 404);

    res.locals.contact = contact;

    return next();
};