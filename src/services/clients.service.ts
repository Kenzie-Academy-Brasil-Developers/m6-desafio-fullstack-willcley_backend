import AppError from "../errors/AppErrors.error";
import { Client } from "../entities/index";
import {
    TCreateClient,
    TUpdateClient,
} from "../interfaces/clients.interfaces";
import { clientRepo } from "../repositories";

export const createClientService = async (data: TCreateClient): Promise<Client> => {
    const phones: JSON = JSON.parse(data.phones);
    return await clientRepo.save({...data, phones});
};

export const readClientService = async (): Promise<Client[]> => {
    return await clientRepo.find({
        relations: { emails: true, contacts: true },
    });
};

export const updateClientService = async (
    data: TUpdateClient,
    client: Client
): Promise<Client> => {
    let phones: JSON = client.phones;
    if (data.phones) phones = JSON.parse(data.phones);

    return await clientRepo.save({
        ...client,
        ...data,
        phones,
    });
};

export const deleteClientService = async (client: Client): Promise<void> => {
    await clientRepo.remove(client);
};