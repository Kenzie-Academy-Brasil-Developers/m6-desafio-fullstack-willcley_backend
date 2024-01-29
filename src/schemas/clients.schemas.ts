import { z } from "zod";

export const clientReturnSchema = z.object({
    id: z.string(),
    fullname: z.string().max(50),
    createdAt: z.string(),
    phones: z.number().array(),
    emails: z.object({
        id: z.string(),
        email: z.string(),
    }).array(),
    contacts: z.object({
        id: z.string(),
        fullname: z.string().max(50),
        createdAt: z.string(),
        emails: z.string().array(),
        phones: z.number().array(),
    }).array(),
});

export const clientReadReturnSchema = clientReturnSchema.array();

const clientSchema = z.object({
    id: z.string(),
    fullname: z.string().max(50),
    createdAt: z.string(),
    phones: z.string(),
    email: z.string(),
    password: z.string(),
});

export const createClientSchema = clientSchema.omit({
    id: true,
    createdAt: true,
    email: true,
    password: true,
});

export const createClientAndEmailSchema = clientSchema.omit({
    id: true,
    createdAt: true,
});