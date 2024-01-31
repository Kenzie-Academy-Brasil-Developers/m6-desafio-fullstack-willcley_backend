import AppError from "../errors/AppErrors.error";
import { NextFunction, Request, Response } from "express";
import { Client, Contact } from "../entities/index";
import { clientRepo } from "../repositories";
import { clientReturnSchema } from "../schemas/clients.schemas";

export const verifyClientExists = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    let { clientId } = req.params;
    if (req.body.clientId) clientId = req.body.clientId;

    const client: Client | null = await clientRepo.findOne({
        where: { id: clientId },
        relations: { emails: true, contacts: true },
    });

    if (!client) throw new AppError("Client not found.", 404);

    const clientReturn = clientReturnSchema.parse(client);
    res.locals.client = clientReturn;

    return next();
};