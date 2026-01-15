const express = require("express");

const userRoutesV1 = express.Router();
const user = require("./user");

/**
 * @route   POST /users
 * @desc    Create a user
 */
userRoutesV1.post("/", user.createOne);

/**
 * @route   GET /users
 * @desc    Get all users
 */
userRoutesV1.get("/", user.fetchAll);

/**
 * @route   GET /users/:id
 * @desc    Get user by ID
 */
userRoutesV1.get("/:id", user.fetchOne);

/**
 * @route   PUT /users/:id
 * @desc    Update user
 */
userRoutesV1.put("/:id", user.updateOne);

/**
 * @route   DELETE /users/:id
 * @desc    Delete user
 */
userRoutesV1.delete("/:id", user.deleteOne);

module.exports = userRoutesV1;
