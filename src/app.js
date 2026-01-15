const express = require("express");
const { sequelize, connectDB, createDatabaseIfNotExists, seedAdminUser } = require("./config");
const router = require('./api/routes');

// Import models BEFORE sync
require("./models/user");

const app = express();
app.use(express.json());



app.get("/health-check", (req, res) => {
    res.send("Hello World! Server is running.🚀");
});
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
