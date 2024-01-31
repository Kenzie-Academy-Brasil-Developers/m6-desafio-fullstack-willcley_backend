import { AppDataSource } from "./data-source";
import { Client, Contact, Email } from "./entities/index";
import { TClientRepo } from "./interfaces/clients.interfaces";
import { TContactRepo } from "./interfaces/contacts.interfaces";
import { TEmailRepo } from "./interfaces/emails.interfaces";

export const clientRepo: TClientRepo = AppDataSource.getRepository(Client);
export const contactRepo: TContactRepo = AppDataSource.getRepository(Contact);
export const emailRepo: TEmailRepo = AppDataSource.getRepository(Email);