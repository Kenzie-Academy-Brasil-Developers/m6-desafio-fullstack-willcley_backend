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
import { verifyClientEmailOwner, verifyClientExists } from "../middlewares/clients.middleware";

export const emailRouter: Router = Router();

emailRouter.post(
    "/",
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
    verifyClientExists,
    validateBody(updateEmailSchema),
    verifyToken,
    verifyEmailExists,
    verifyPermissions,
    verifyClientEmailOwner,
    updateClientEmailController,
);

emailRouter.delete(
    "/:emailId",
    verifyClientExists,
    verifyToken,
    verifyEmailExists,
    verifyPermissions,
    verifyClientEmailOwner,
    verifyHasAnotherEmail,
    deleteClientEmailController,
);