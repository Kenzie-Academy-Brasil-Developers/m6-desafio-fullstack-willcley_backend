import { z } from "zod";
import {
    createContactSchema,
    updateContactSchema
} from "../schemas/contacts.schemas";
import { Repository } from "typeorm";
import { Contact } from "../entities/index";

export type TCreateContact = z.infer<typeof createContactSchema>;
export type TUpdateContact = z.infer<typeof updateContactSchema>;

export type TContactRepo = Repository<Contact>;