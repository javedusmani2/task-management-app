const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// Get all tasks for the logged-in user
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.userId });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching tasks' });
    }
});

// Create a new task
router.post('/', async (req, res) => {
    const { title } = req.body;
    try {
        const newTask = new Task({ title, userId: req.userId });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ message: 'Error creating task' });
    }
});

// Update a task
router.put('/:id', async (req, res) => {
    const { title, completed } = req.body;
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, { title, completed }, { new: true });
        res.json(updatedTask);
    } catch (err) {
        res.status(500).json({ message: 'Error updating task' });
    }
});

// Delete a task
router.delete('/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting task' });
    }
});

module.exports = router;
