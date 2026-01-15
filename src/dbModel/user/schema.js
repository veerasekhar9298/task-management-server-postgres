const { DataTypes, UUID } = require("sequelize");
const { sequelize } = require("../../config/db");
const bcrypt = require('bcryptjs');

const User = sequelize.define("User", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('admin', 'manager', 'employee'),
        defaultValue: 'employee',
        allowNull: false,
    },
}, {
    defaultScope: {
        attributes: { exclude: ["password"] },
    },
    scopes: {
        withPassword: {
            attributes: {},
        },
    },
});

const SALT_ROUNDS = Number(process.env.USER_PASSWORD_SALT_FACTOR) || 10;

User.beforeCreate(async (user) => {
    try {
        if (!user.password) {
            throw new Error("Password is required");
        }
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        user.password = await bcrypt.hash(user.password, salt);
    } catch (err) {
        throw new Error(err);
    }
});

User.beforeUpdate(async (user) => {
    if (!user.changed("password")) return;

    try {
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        user.password = await bcrypt.hash(user.password, salt);
    } catch (err) {
        throw new Error(err);
    }
});

User.prototype.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};



module.exports = User;
