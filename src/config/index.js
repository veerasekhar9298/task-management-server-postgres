const { sequelize, connectDB } = require("../config/db");
const { createDatabaseIfNotExists } = require("../config/createDatabase");
const { seedAdminUser } = require("../config/seedAdminUser");



module.exports = { sequelize, connectDB, createDatabaseIfNotExists, seedAdminUser };