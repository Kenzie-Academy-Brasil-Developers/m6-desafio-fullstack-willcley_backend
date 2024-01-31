import { Router } from "express";
import { validateBody, verifyPermissions, verifyToken } from "../middlewares/globals.middleware";
import { createContactSchema, updateContactSchema } from "../schemas/contacts.schemas";
import { verifyClientExists } from "../middlewares/clients.middleware";
import {
    createContactController,
    deleteContactController,
    readContactController,
    updateContactController
} from "../controllers/contacts.controller";
import { verifyContactExists } from "../middlewares/contacts.middleware";

export const contactRouter: Router = Router();

contactRouter.post(
    "/",
    verifyToken,
    validateBody(createContactSchema),
    verifyClientExists,
    createContactController,
);

contactRouter.get(
    "/clients/:clientId",
    verifyToken,
    verifyClientExists,
    verifyPermissions,
    readContactController,
);

contactRouter.patch(
    "/:contactId/clients/:clientId",
    verifyToken,
    validateBody(updateContactSchema),
    verifyContactExists,
    verifyPermissions,
    updateContactController,
);

contactRouter.delete(
    "/:contactId/clients/:clientId",
    verifyToken,
    verifyContactExists,
    verifyPermissions,
    deleteContactController,
);