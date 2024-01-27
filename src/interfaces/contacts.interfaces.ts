import { z } from "zod";
import {
    createContactSchema,
    readContactSchema,
} from "../schemas/contacts.schemas";
import { DeepPartial, Repository } from "typeorm";
import { Contact } from "../entities/index";

export type TCreateContact = z.infer<typeof createContactSchema>;
export type TReadContact = z.infer<typeof readContactSchema>;
export type TUpdateContact = DeepPartial<TCreateContact>;

export type TContactRepo = Repository<Contact>;