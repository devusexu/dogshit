const Task = require('../models/task');
const { NotFoundError } = require('../utils/error');

async function index(req, res, next) {
    try {
        const { userId } = req.user;
        const tasks = await Task.find({ userId });

        res.json(tasks);
    } catch (error) {
        next(error);
    }
}

async function create(req, res, next) {
    try {
        const { userId } = req.user; 

        const createdTask = await Task.create({
            ...req.validatedData,
            userId
        });

        return res.status(201).json(createdTask);
    } catch (error) {
        next(error);
    }
}

async function update(req, res, next) {
    try {
        const { userId } = req.user;
        const { description, done } = req.validatedData;
        const updatedTask = await Task.findOneAndUpdate(
            { userId, _id: req.params.id },
            { description, done },
            { new: true }
        );

        res.json(updatedTask);
    } catch (error) {
        next(error);
    }
}

async function destroy(req, res, next) {
    try {
        const { userId } = req.user;
        const deletedTask = await Task.findOneAndDelete({userId, _id: req.params.id});

        if (!deletedTask) {
            throw new NotFoundError('Task not found');
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
}



module.exports = { index, create, update, destroy }