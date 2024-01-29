import "dotenv/config";
import { app } from "./app";
import { AppDataSource } from "./data-source";

AppDataSource.initialize()
    .then(() => {
        console.log("Server is running");

        const PORT: number = Number(process.env.PORT) || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`)
        });
    })
    .catch((err: unknown): void => {
        console.log("Error during Data Source initialization", err);
    });