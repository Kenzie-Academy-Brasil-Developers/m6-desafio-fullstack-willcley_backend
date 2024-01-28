import { z } from "zod";

export const clientSchema = z.object({
    id: z.string(),
    fullname: z.string().max(50),
    createdAt: z.string(),
    phones: z.string(),
});

export const createClientSchema = clientSchema.omit({
    id: true,
    createdAt: true,
});