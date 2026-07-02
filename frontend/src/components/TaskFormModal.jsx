import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TaskFormModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Pending',
    priority: 'Medium',
    dueDate: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        status: initialData.status || 'Pending',
        priority: initialData.priority || 'Medium',
        dueDate: initialData.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : '',
      });
    } else {
      setFormData({
        title: '',
        description: '',
        status: 'Pending',
        priority: 'Medium',
        dueDate: '',
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    onSubmit(formData);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="glass-modal rounded-[2rem] w-full max-w-lg overflow-hidden relative z-10 border border-white/40"
          >
            <div className="flex justify-between items-center px-8 py-6 border-b border-slate-100/50 bg-white/50">
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                {initialData ? 'Edit Task' : 'Create Task'}
              </h2>
              <motion.button 
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose} 
                className="p-2 text-slate-400 hover:text-slate-700 bg-white rounded-full shadow-sm border border-slate-100 transition-colors"
              >
                <X size={20} strokeWidth={2.5} />
              </motion.button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6 bg-white/30">
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-slate-700 mb-2">
                  Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  maxLength={100}
                  required
                  className="w-full px-4 py-3 border-2 border-transparent bg-white/80 hover:bg-white rounded-2xl focus:bg-white focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium text-slate-800 shadow-sm"
                  placeholder="What needs to be done?"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-slate-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-transparent bg-white/80 hover:bg-white rounded-2xl focus:bg-white focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all resize-none font-medium text-slate-800 shadow-sm"
                  placeholder="Add some details..."
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="priority" className="block text-sm font-semibold text-slate-700 mb-2">
                    Priority
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-transparent bg-white/80 hover:bg-white rounded-2xl focus:bg-white focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium text-slate-800 shadow-sm appearance-none"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem' }}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="dueDate" className="block text-sm font-semibold text-slate-700 mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-transparent bg-white/80 hover:bg-white rounded-2xl focus:bg-white focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium text-slate-800 shadow-sm"
                  />
                </div>
              </div>

              <div className="pt-6 flex justify-end gap-4 border-t border-slate-200/50">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl font-semibold transition-colors shadow-sm"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={!formData.title.trim()}
                  className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-2xl font-semibold shadow-lg shadow-indigo-500/30 transition-all border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {initialData ? 'Save Changes' : 'Create Task'}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TaskFormModal;
