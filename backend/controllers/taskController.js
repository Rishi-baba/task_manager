import Task from "../models/Task.js";

export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({}).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;
    if (!title) {
      res.status(400);
      throw new Error("Please add a title");
    }
    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
    });
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }
    await task.deleteOne();
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    next(error);
  }
};
