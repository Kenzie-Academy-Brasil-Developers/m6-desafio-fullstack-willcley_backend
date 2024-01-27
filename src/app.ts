import "reflect-metadata";
import "express-async-errors";
import express, { Application } from "express";
import { handleError } from "./middlewares/handleErrors.middleware";

export const app: Application = express();
app.use(express.json());

app.use(handleError);