import { z } from "zod";

export const emailSchema = z.object({
    id: z.string(),
    email: z.string().email().max(50),
    password: z.string().max(120),
    client: z.object({
        id: z.string(),
        fullname: z.string(),
    }),
});

export const returnEmailSchema = emailSchema.omit({ password: true });

export const createEmailSchema = emailSchema.omit({ id: true, client: true });
export const readEmailSchema = returnEmailSchema.array();
export const updateEmailSchema = emailSchema.pick({ password: true });

export const loginSchema = emailSchema.pick({
    email: true,
    password: true,
});

export const sessionReturn = z.object({
    token: z.string(),
    client: z.object({
        id: z.string(),
        fullname: z.string().max(50)
    }),
});