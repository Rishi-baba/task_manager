import React, { useState, useMemo } from 'react';
import { Plus, Search, Filter, Loader2, Inbox } from 'lucide-react';
import { useTasks } from '../hooks/useTasks';
import TaskCard from '../components/TaskCard';
import TaskFormModal from '../components/TaskFormModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import Magnet from '../components/Magnet';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
  const { tasks, loading, addTask, editTask, removeTask } = useTasks();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');

  const handleOpenCreate = () => {
    setSelectedTask(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (task) => {
    setSelectedTask(task);
    setIsFormOpen(true);
  };

  const handleOpenDelete = (task) => {
    setSelectedTask(task);
    setIsDeleteOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    let success;
    if (selectedTask) {
      success = await editTask(selectedTask._id, formData);
    } else {
      success = await addTask(formData);
    }
    if (success) {
      setIsFormOpen(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (selectedTask) {
      const success = await removeTask(selectedTask._id);
      if (success) {
        setIsDeleteOpen(false);
      }
    }
  };

  const handleStatusToggle = async (task) => {
    const newStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
    await editTask(task._id, { status: newStatus });
  };

  const filteredAndSortedTasks = useMemo(() => {
    let result = [...tasks];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(task => 
        task.title.toLowerCase().includes(query) || 
        (task.description && task.description.toLowerCase().includes(query))
      );
    }

    if (statusFilter !== 'All') {
      result = result.filter(task => task.status === statusFilter);
    }

    result.sort((a, b) => {
      if (sortBy === 'Newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === 'Oldest') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (sortBy === 'Priority') {
        const priorityScore = { High: 3, Medium: 2, Low: 1 };
        return priorityScore[b.priority] - priorityScore[a.priority];
      }
      return 0;
    });

    return result;
  }, [tasks, searchQuery, statusFilter, sortBy]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div>
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">My Tasks</h2>
          <p className="text-slate-500 mt-2 text-lg">Manage your day beautifully.</p>
        </div>
        <Magnet>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpenCreate}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg shadow-indigo-500/30 transition-all border border-white/20"
          >
            <Plus size={20} strokeWidth={2.5} />
            <span>New Task</span>
          </motion.button>
        </Magnet>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass p-5 rounded-3xl flex flex-col md:flex-row gap-4 items-center justify-between"
      >
        <div className="relative w-full md:w-96 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border-2 border-transparent bg-slate-100/50 hover:bg-slate-100 rounded-2xl focus:bg-white focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium text-slate-700 placeholder-slate-400"
          />
        </div>
        
        <div className="flex w-full md:w-auto gap-3">
          <div className="flex items-center gap-2 flex-1 md:flex-none">
            <Filter size={18} className="text-slate-400 hidden sm:block" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-3 border-2 border-transparent bg-slate-100/50 hover:bg-slate-100 rounded-2xl focus:bg-white focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 outline-none cursor-pointer font-medium text-slate-700 transition-all appearance-none"
              style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem' }}
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="flex-1 md:flex-none">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 border-2 border-transparent bg-slate-100/50 hover:bg-slate-100 rounded-2xl focus:bg-white focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 outline-none cursor-pointer font-medium text-slate-700 transition-all appearance-none"
              style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem' }}
            >
              <option value="Newest">Newest First</option>
              <option value="Oldest">Oldest First</option>
              <option value="Priority">Priority</option>
            </select>
          </div>
        </div>
      </motion.div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          >
            <Loader2 size={48} className="text-indigo-600 mb-4" />
          </motion.div>
          <p className="text-slate-500 font-medium text-lg">Loading your tasks...</p>
        </div>
      ) : filteredAndSortedTasks.length > 0 ? (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredAndSortedTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={handleOpenEdit}
                onDelete={handleOpenDelete}
                onStatusToggle={handleStatusToggle}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-3xl border border-dashed border-slate-300 p-16 flex flex-col items-center justify-center text-center"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center text-indigo-500 mb-6 shadow-inner shadow-white">
            <Inbox size={48} strokeWidth={1.5} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">No tasks found</h3>
          <p className="text-slate-500 max-w-sm mb-8 text-lg">
            {searchQuery || statusFilter !== 'All' 
              ? "We couldn't find any tasks matching your current filters. Try adjusting them." 
              : "You don't have any tasks yet. Create one to get started!"}
          </p>
          {!(searchQuery || statusFilter !== 'All') && (
            <Magnet>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenCreate}
                className="bg-slate-900 text-white hover:bg-slate-800 px-8 py-3.5 rounded-2xl font-semibold transition-colors shadow-lg shadow-slate-900/20"
              >
                Create First Task
              </motion.button>
            </Magnet>
          )}
        </motion.div>
      )}

      <TaskFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={selectedTask}
      />

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        taskTitle={selectedTask?.title}
      />
    </div>
  );
};

export default Dashboard;
