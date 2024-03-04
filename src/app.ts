import "reflect-metadata";
import "express-async-errors";
import express, { Application } from "express";
import { handleError } from "./middlewares/handleErrors.middleware";
import { routers } from "./routers";

const cors = require("cors");
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
    optionSuccessStatus: 200
};

export const app: Application = express();
app.use(express.json());
app.use(cors(
    corsOptions,
    origin="https://gerenciador-de-contatos-nu.vercel.app",
))

app.use("/", routers);

app.use(handleError);