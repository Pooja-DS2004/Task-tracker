import { useState, useEffect, useCallback } from 'react';
import { getTasks, createTask, updateTask, deleteTask, updateStatus } from '../api/tasks';
import toast from 'react-hot-toast';

export function useTasks(filters) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getTasks(filters);
      setTasks(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (data) => {
    try {
      const res = await createTask(data);
      setTasks(prev => [res.data.data, ...prev]);
      toast.success('Task created!');
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create task');
      return false;
    }
  };

  const editTask = async (id, data) => {
    try {
      const res = await updateTask(id, data);
      setTasks(prev => prev.map(t => t._id === id ? res.data.data : t));
      toast.success('Task updated!');
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update task');
      return false;
    }
  };

  const removeTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(prev => prev.filter(t => t._id !== id));
      toast.success('Task deleted');
    } catch (err) {
      toast.error('Failed to delete task');
    }
  };

  const toggleStatus = async (id, status) => {
    try {
      const res = await updateStatus(id, status);
      setTasks(prev => prev.map(t => t._id === id ? res.data.data : t));
      toast.success('Status updated');
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  return { tasks, loading, error, addTask, editTask, removeTask, toggleStatus, refetch: fetchTasks };
}
