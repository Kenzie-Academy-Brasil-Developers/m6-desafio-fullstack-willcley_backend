import { Request, Response } from "express";
import { Client } from "../entities/index";
import {
    createClientService,
    readClientService,
    updateClientService,
    deleteClientService,
} from "../services/clients.service";

export const createClientController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const client: Client = await createClientService(req.body);
    return res.status(201).json(client);
};

export const readClientController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const clients: Client[] = await readClientService();
    return res.status(200).json(clients);
};

export const updateClientController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const { client } = res.locals;
    const updatedClient: Client = await updateClientService(req.body, client);

    return res.status(200).json(updatedClient);
};

export const deleteClientController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const { client } = res.locals;
    await deleteClientService(client);

    return res.status(204).json();
};