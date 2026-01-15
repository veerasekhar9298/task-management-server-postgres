const { DataTypes, UUID } = require("sequelize");
const { sequelize } = require("../config/db");

const User = sequelize.define("User", {
    UUID: {
        type: DataTypes.UUID,
        defaultValue: UUID,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
});

module.exports = User;
