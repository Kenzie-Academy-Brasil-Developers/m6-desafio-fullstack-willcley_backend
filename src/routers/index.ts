import { Router } from "express";
import { clientRouter } from "./clients.router";
import { contactRouter } from "./contacts.router";
import { sessionRouter } from "./session.router";

export const routers: Router = Router();

routers.use("/clients", clientRouter);
routers.use("/contacts", contactRouter);
routers.use("/login", sessionRouter);