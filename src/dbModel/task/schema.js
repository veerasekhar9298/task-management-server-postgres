const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");

const Task = sequelize.define("Task", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM("todo", "in_progress", "completed"),
        defaultValue: "todo",
        allowNull: false,
    },
    createdBy: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "Users",
            key: "id",
        },
    },
    assignedTo: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: "Users",
            key: "id",
        },
    },
}, {
    tableName: "Tasks",
    timestamps: true,
});

module.exports = Task;
