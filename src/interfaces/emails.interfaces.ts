import { z } from "zod";
import {
    returnEmailSchema,
    createEmailSchema,
    readEmailSchema,
    updateEmailSchema,
    loginSchema,
} from "../schemas/emails.schemas";
import { Repository } from "typeorm";
import { Email } from "../entities/index";

export type TReturnEmail = z.infer<typeof returnEmailSchema>;
export type TCreateEmail = z.infer<typeof createEmailSchema>;
export type TReadEmail = z.infer<typeof readEmailSchema>;
export type TUpdateEmail = z.infer<typeof updateEmailSchema>;

export type TLogin = z.infer<typeof loginSchema>;
export type TLoginReturn = { token: string };

export type TEmailRepo = Repository<Email>;