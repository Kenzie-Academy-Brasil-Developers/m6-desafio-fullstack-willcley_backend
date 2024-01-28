import { z } from "zod";
import { createClientSchema } from "../schemas/clients.schemas";
import { DeepPartial, Repository } from "typeorm";
import { Client } from "../entities/index";

export type TCreateClient = z.infer<typeof createClientSchema>;
export type TUpdateClient = DeepPartial<TCreateClient>;

export type TClientRepo = Repository<Client>;