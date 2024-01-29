import AppError from "../errors/AppErrors.error";
import { Request, Response } from "express";
import { Client } from "../entities/index";
import {
    createClientService,
    readClientService,
    updateClientService,
    deleteClientService,
} from "../services/clients.service";
import { createEmailService } from "../services/emails.service";
import { clientRepo } from "../repositories";
import { clientReadReturnSchema, clientReturnSchema } from "../schemas/clients.schemas";

export const createClientController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const { fullname, phones, email, password } = req.body;

    const client: Client = await createClientService({
        fullname,
        phones,
    });
    await createEmailService({
        email,
        password,
        clientId: client.id,
    });

    const createdClient: Client | null = await clientRepo.findOne({
        where: { id: client.id },
        relations: { emails: true, contacts: true },
        
    });
    if (!createdClient) throw new AppError("Client not found.", 404);

    const clientReturn = clientReturnSchema.parse(createdClient);
    return res.status(201).json(clientReturn);
};

export const readClientController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const clients: Client[] = await readClientService();
    const clientsReturn = clientReadReturnSchema.parse(clients);

    return res.status(200).json(clientsReturn);
};

export const updateClientController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const { client } = res.locals;
    const updatedClient: Client = await updateClientService(req.body, client);
    const clientReturn = clientReturnSchema.parse(updatedClient);

    return res.status(200).json(clientReturn);
};

export const deleteClientController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const { client } = res.locals;
    await deleteClientService(client);

    return res.status(204).json();
};