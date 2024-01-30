import { Router } from "express";
import { validateBody, verifyPermissions, verifyToken } from "../middlewares/globals.middleware";
import {
    createEmailController,
    deleteClientEmailController,
    readClientEmailController,
    updateClientEmailController
} from "../controllers/emails.controller";
import {
    verifyEmailExists,
    verifyHasAnotherEmail,
    verifyUniqueEmail
} from "../middlewares/emails.middleware";
import { createEmailSchema, updateEmailSchema } from "../schemas/emails.schemas";
import { verifyClientExists } from "../middlewares/clients.middleware";

export const emailRouter: Router = Router();

emailRouter.post(
    "/",
    verifyToken,
    verifyClientExists,
    validateBody(createEmailSchema),
    verifyUniqueEmail,
    createEmailController,
);

emailRouter.get(
    "/",
    verifyClientExists,
    verifyToken,
    readClientEmailController,
);

emailRouter.patch(
    "/:emailId",
    verifyToken,
    verifyClientExists,
    validateBody(updateEmailSchema),
    verifyEmailExists,
    verifyPermissions,
    updateClientEmailController,
);

emailRouter.delete(
    "/:emailId",
    verifyToken,
    verifyClientExists,
    verifyEmailExists,
    verifyPermissions,
    verifyHasAnotherEmail,
    deleteClientEmailController,
);