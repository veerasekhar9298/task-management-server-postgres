const express = require("express");
const createDatabaseIfNotExists = require("./config/createDatabase");
const { sequelize, connectDB } = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const seedAdminUser = require("./config/seedAdminUser");
// Import models BEFORE sync
require("./models/user");

const app = express();
app.use(express.json());

app.use("/users", userRoutes);


app.get("/health-check", (req, res) => {
    res.send("Hello World! Server is running.🚀");
});

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
