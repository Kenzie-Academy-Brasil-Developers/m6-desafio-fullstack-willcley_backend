import { z } from "zod";
import {
    createEmailSchema,
    readEmailSchema,
    returnEmailSchema,
    loginSchema,
} from "../schemas/emails.schemas";
import { DeepPartial, Repository } from "typeorm";
import { Email } from "../entities/index";

export type TCreateEmail = z.infer<typeof createEmailSchema>;
export type TReadEmail = z.infer<typeof readEmailSchema>;
export type TUpdateEmail = DeepPartial<TCreateEmail>;
export type TReturnEmail = z.infer<typeof returnEmailSchema>;
export type TLogin = z.infer<typeof loginSchema>;
export type TLoginReturn = { token: string };

export type TEmailRepo = Repository<Email>;