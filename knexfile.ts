import type { Knex } from "knex";
import { config as dotenv } from "dotenv";
dotenv();
// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
    development: {
        client: process.env.DB_CLIENT,
        connection: {
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
            directory: "./src/migrations"
        },
        seeds: {
            directory: "./src/seeds",
        }
    },

    staging: {
        client: process.env.DB_CLIENT,
        connection: {
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
            directory: "./src/migrations",
        },
        seeds: {
            directory: "./src/seeds",
        }
    },

    production: {
        client: process.env.DB_CLIENT,
        connection: {
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
            directory: "./src/migrations",
        },
        seeds: {
            directory: "./src/seeds",
        }
    },
};

module.exports = config;
