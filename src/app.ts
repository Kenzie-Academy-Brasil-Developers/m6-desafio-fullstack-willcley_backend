import "reflect-metadata";
import "express-async-errors";
import express from "express";

export const app = express();

app.use(express.json());