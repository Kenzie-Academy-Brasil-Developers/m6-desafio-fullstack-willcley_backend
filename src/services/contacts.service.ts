import AppError from "../errors/AppErrors.error";
import { Contact } from "../entities/index";
import {
    TCreateContact,
    TUpdateContact,
} from "../interfaces/contacts.interfaces";
import { contactRepo } from "../repositories";

export const createContactService = async (data: TCreateContact): Promise<Contact> => {
    const emails: JSON = JSON.parse(data.emails);
    const phones: JSON = JSON.parse(data.phones);
    return await contactRepo.save({...data, emails, phones});
};

export const readContactService = async (): Promise<Contact[]> => {
    return await contactRepo.find();
};

export const updateContactService = async (
    data: TUpdateContact,
    contact: Contact
): Promise<Contact> => {
    let emails: JSON = contact.emails;
    let phones: JSON = contact.phones;
    if (data.emails) emails = JSON.parse(data.emails);
    if (data.phones) phones = JSON.parse(data.phones);

    return await contactRepo.save({
        ...contact,
        ...data,
        emails,
        phones
    });
};

export const deleteContactService = async (contact: Contact): Promise<void> => {
    await contactRepo.remove(contact);
};