import { z } from "zod";

export const emailSchema = z.object({
    id: z.string(),
    email: z.string().email().max(50),
    password: z.string().max(120),
    clientId: z.string(),
});

export const createEmailSchema = emailSchema.omit({
    id: true,
});
export const readEmailSchema = emailSchema.array();
export const updateEmailSchema = emailSchema.partial();
export const returnEmailSchema = emailSchema.omit({
    password: true,
});
export const loginSchema = emailSchema.pick({
    email: true,
    password: true,
});