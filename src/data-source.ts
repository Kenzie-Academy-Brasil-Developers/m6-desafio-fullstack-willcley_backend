import path from "path";
import { DataSource, DataSourceOptions } from "typeorm";
import "dotenv/config";

const DataSourceConfig = (): DataSourceOptions => {
    const entitiesPath: string = path.join(__dirname, "./entities/**.{js,ts}");
    const migrationsPath: string = path.join(__dirname, "./migrations/**.{js,ts}");

    if (!process.env.DATABASE_URL) {
        throw new Error("Missing env var: 'DATABASE_URL'");
    };

    return {
        type: "postgres",
        url: process.env.DATABASE_URL,
        synchronize: false,
        logging: true,
        entities: [entitiesPath],
        migrations: [migrationsPath]
    };
};

export const AppDataSource = new DataSource(DataSourceConfig());