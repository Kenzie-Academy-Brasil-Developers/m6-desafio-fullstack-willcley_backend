import AppError from "../errors/AppErrors.error";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { z } from "zod";

export const validateBody = (schema: z.ZodTypeAny) => (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    req.body = schema.parse({...req.body, ...req.params});
    return next();
};

export const verifyToken = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const { authorization } = req.headers;

    if (!authorization) throw new AppError("Missing bearer token.", 401);

    const token: string = authorization.split(" ")[1];
    const decoded = verify(token, process.env.SECRET_KEY!);
    res.locals.decoded = decoded;

    return next();
};

export const verifyPermissions = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const { clientId } = req.params;
    const { client } = res.locals
    const { sub } = res.locals.decoded;

    if (clientId != sub && client.id != sub) throw new AppError(
        "Insufficient permission",
        401
    );

    return next();
};