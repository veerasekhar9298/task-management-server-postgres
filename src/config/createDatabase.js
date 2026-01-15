const { Client } = require("pg");
require("dotenv").config();

const createDatabaseIfNotExists = async () => {
    const client = new Client({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: "postgres", // system DB
    });

    const dbName = process.env.DB_NAME;

    try {
        await client.connect();

        // 1️⃣ Check if DB exists
        const res = await client.query(
            `SELECT 1 FROM pg_database WHERE datname = $1`,
            [dbName]
        );

        if (res.rowCount === 0) {
            // 2️⃣ Create DB safely
            await client.query(`CREATE DATABASE "${dbName}"`);
            console.log(`📦 Database "${dbName}" created`);
        } else {
            console.log(`📦 Database "${dbName}" already exists`);
        }
    } catch (error) {
        console.error("❌ Database creation failed:", error);
        throw error; // IMPORTANT
    } finally {
        await client.end();
    }
};

module.exports = { createDatabaseIfNotExists }
