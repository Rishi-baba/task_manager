import { useState, useEffect, useCallback } from 'react';
import { taskAPI } from '../services/api';
import toast from 'react-hot-toast';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await taskAPI.getAll();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch tasks');
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (taskData) => {
    try {
      const newTask = await taskAPI.create(taskData);
      setTasks((prev) => [newTask, ...prev]);
      toast.success('Task created successfully');
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create task');
      return false;
    }
  };

  const editTask = async (id, taskData) => {
    try {
      const updatedTask = await taskAPI.update(id, taskData);
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? updatedTask : task))
      );
      toast.success('Task updated successfully');
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update task');
      return false;
    }
  };

  const removeTask = async (id) => {
    try {
      await taskAPI.delete(id);
      setTasks((prev) => prev.filter((task) => task._id !== id));
      toast.success('Task deleted successfully');
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete task');
      return false;
    }
  };

  return { tasks, loading, error, fetchTasks, addTask, editTask, removeTask };
};
