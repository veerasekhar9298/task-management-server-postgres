const express = require("express");
const { sequelize, connectDB, createDatabaseIfNotExists, seedAdminUser } = require("./config");
const router = require('./api/routes');

require('./dbModel/index')(); // Initialize DB models

const app = express();
app.use(express.json());

router(app);
const initApp = async () => {
    //  Create DB if missing
    await createDatabaseIfNotExists();

    // Connect Sequelize to DB
    await connectDB();

    // Create tables
    await sequelize.sync({ alter: true });
    console.log("Tables synced");
    await seedAdminUser();
};

initApp();

module.exports = app;
