import "reflect-metadata";
import "express-async-errors";
import express, { Application } from "express";
import { handleError } from "./middlewares/handleErrors.middleware";
import { routers } from "./routers";

export const app: Application = express();
app.use(express.json());

app.use("/", routers);

app.use(handleError);