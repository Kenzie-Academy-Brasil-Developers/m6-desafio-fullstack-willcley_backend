import AppError from "../errors/AppErrors.error";
import { Client, Contact } from "../entities/index";
import {
    TCreateContact,
    TUpdateContact,
} from "../interfaces/contacts.interfaces";
import { clientRepo, contactRepo } from "../repositories";

export const createContactService = async (data: TCreateContact): Promise<Contact> => {
    const { fullname, clientId } = data;
    const emailsStringJSON: string = JSON.stringify(data.emails);
    const emails: JSON = JSON.parse(emailsStringJSON);
    const phones: JSON = JSON.parse(data.phones);

    const client: Client | null = await clientRepo.findOneBy({ id: clientId });
    if (!client) throw new AppError("Client not found.", 404);

    return await contactRepo.save({
        fullname,
        emails,
        phones,
        client: client,
    });
};

export const updateContactService = async (
    data: TUpdateContact,
    contact: Contact
): Promise<Contact> => {
    let fullname: string = contact.fullname;
    let emails: JSON = contact.emails;
    let phones: JSON = contact.phones;
    if (data.emails) {
        const emailsStringJSON: string = JSON.stringify(data.emails);
        emails = JSON.parse(emailsStringJSON);
    };
    if (data.phones) phones = JSON.parse(data.phones);
    if (data.fullname) fullname = data.fullname;

    return await contactRepo.save({
        ...contact,
        fullname,
        emails,
        phones
    });
};

export const deleteContactService = async (contact: Contact): Promise<void> => {
    await contactRepo.remove(contact);
};