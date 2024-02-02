import { Router } from "express";
import { createClientController, deleteClientController, getClientController, readClientController, updateClientController } from "../controllers/clients.controller";
import { validateBody, verifyPermissions, verifyToken } from "../middlewares/globals.middleware";
import { verifyUniqueEmail } from "../middlewares/emails.middleware";
import { createClientAndEmailSchema, createClientSchema, updateClientSchema } from "../schemas/clients.schemas";
import { emailRouter } from "./emails.router";
import { verifyClientExists } from "../middlewares/clients.middleware";

export const clientRouter: Router = Router();

clientRouter.post(
    "/",
    validateBody(createClientAndEmailSchema),
    verifyUniqueEmail,
    createClientController
);

clientRouter.get(
    "/",
    readClientController
);

clientRouter.get(
    "/:clientId",
    verifyToken,
    verifyClientExists,
    verifyPermissions,
    getClientController
);

clientRouter.patch(
    "/:clientId",
    verifyToken,
    validateBody(updateClientSchema),
    verifyClientExists,
    verifyPermissions,
    updateClientController,
);

clientRouter.delete(
    "/:clientId",
    verifyToken,
    verifyClientExists,
    verifyPermissions,
    deleteClientController,
);

clientRouter.use(
    "/:clientId/emails",
    emailRouter,
);