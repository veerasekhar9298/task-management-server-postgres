const express = require("express");
const router = express.Router();

const task = require("./task");

/**
 * @route   POST /tasks
 * @desc    Create a task
 * @access  Admin, Manager
 */
router.post(
    "/",
    task.createOne
);

/**
 * @route   GET /tasks
 * @desc    Get tasks based on role
 *          Admin    -> all tasks
 *          Manager  -> tasks created by them
 *          Employee -> tasks assigned to them
 * @access  Admin, Manager, Employee
 */
router.get(
    "/",
    task.fetchAll
);

/**
 * @route   GET /tasks/:id
 * @desc    Get task by ID
 * @access  Admin (any)
 *          Manager (own tasks)
 *          Employee (assigned tasks)
 */
router.get(
    "/:id",
    task.fetchOne
);

/**
 * @route   PUT /tasks/:id
 * @desc    Update task
 *          Admin    -> full update
 *          Manager  -> update own tasks
 *          Employee -> update status/comment only
 * @access  Admin, Manager, Employee
 */
router.put(
    "/:id",
    task.updateOne
);

/**
 * @route   PATCH /tasks/:id/status
 * @desc    Update task status (employee action)
 * @access  Employee
 */
router.patch(
    "/:id/status",
    task.updateStatus
);

/**
 * @route   PATCH /tasks/:id/assign
 * @desc    Assign task to employee
 * @access  Admin, Manager
 */
router.patch(
    "/:id/assign",
    task.assignUser
);

/**
 * @route   DELETE /tasks/:id
 * @desc    Delete task
 * @access  Admin
 */
router.delete(
    "/:id",
    task.deleteOne
);

module.exports = router;
