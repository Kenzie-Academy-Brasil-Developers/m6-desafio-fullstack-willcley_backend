import AppError from "../errors/AppErrors.error";
import { NextFunction, Request, Response } from "express";
import { Email } from "../entities/index";
import { emailRepo } from "../repositories";

export const verifyUniqueEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { email } = req.body;
    const clientEmail: Email | null = await emailRepo.findOneBy({ email });

    if (clientEmail) throw new AppError("Email already exists.", 409);

    return next();
};

export const verifyEmailExists = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { emailId } = req.params;
    const email: Email | null = await emailRepo.findOneBy({
        id: emailId,
    });

    if (!email) throw new AppError("Email not found", 404);

    res.locals.email = email;

    return next();
};

export const verifyHasAnotherEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { client } = res.locals;
    const clientEmails: Email[] = client.emails;

    if (!clientEmails[1]) throw new AppError(
        "You need to have at least one email address in your account.",
        401
    );

    return next();
};