import { z } from "zod";

export const contactSchema = z.object({
    id: z.string(),
    fullname: z.string().max(50),
    createdAt: z.string(),
    emails: z.string(),
    phones: z.string(),
    clientId: z.string(),
});

export const createContactSchema = contactSchema.omit({
    id: true,
    createdAt: true,
});
export const updateContactSchema = createContactSchema.omit({
    clientId: true,
});