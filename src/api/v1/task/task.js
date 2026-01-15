const Task = require("../../../dbModel/task/schema");
const User = require("../../../dbModel/user/schema");

/**
 * GET /tasks
 * Admin    -> all tasks
 * Manager  -> tasks created by them
 * Employee -> tasks assigned to them
 */
const fetchAll = async (req, res) => {
    try {
        const { role, id } = req.user; // coming from auth middleware

        let where = {};

        if (role === "manager") {
            where.createdBy = id;
        }

        if (role === "employee") {
            where.assignedTo = id;
        }

        const tasks = await Task.findAll({ where });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * GET /tasks/:id
 */
const fetchOne = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * POST /tasks
 * Manager / Admin
 */
const createOne = async (req, res) => {
    try {
        const { title, description, assignedTo, dueDate, priority } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        const task = await Task.create({
            title,
            description,
            assignedTo,
            dueDate,
            priority,
            status: "pending",
            createdBy: req.user.id, // manager/admin
        });

        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * PUT /tasks/:id
 */
const updateOne = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        const { role, id } = req.user;

        // Employee can update only status/comment
        if (role === "employee") {
            const allowedFields = ["status", "comment"];
            const updates = {};

            for (const key of allowedFields) {
                if (req.body[key] !== undefined) {
                    updates[key] = req.body[key];
                }
            }

            await task.update(updates);
            return res.json(task);
        }

        // Manager can update only their tasks
        if (role === "manager" && task.createdBy !== id) {
            return res.status(403).json({ message: "Access denied" });
        }

        await task.update(req.body);
        res.json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * PATCH /tasks/:id/status
 * Employee
 */
const updateStatus = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (task.assignedTo !== req.user.id) {
            return res.status(403).json({ message: "Not assigned to you" });
        }

        const { status } = req.body;

        await task.update({ status });
        res.json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * PATCH /tasks/:id/assign
 * Admin / Manager
 */
const assignUser = async (req, res) => {
    try {
        const { assignedTo } = req.body;

        const user = await User.findByPk(assignedTo);
        if (!user || user.role !== "employee") {
            return res.status(400).json({ message: "Invalid employee" });
        }

        const task = await Task.findByPk(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        await task.update({ assignedTo });
        res.json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * DELETE /tasks/:id
 * Admin only
 */
const deleteOne = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        await task.destroy();
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    fetchAll,
    fetchOne,
    createOne,
    updateOne,
    updateStatus,
    assignUser,
    deleteOne,
};
