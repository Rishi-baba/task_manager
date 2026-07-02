import React from 'react';
import { Calendar, Clock, Edit2, Trash2, CheckCircle, Circle } from 'lucide-react';
import { motion } from 'framer-motion';

const TaskCard = ({ task, onEdit, onDelete, onStatusToggle }) => {
  const priorityColors = {
    High: 'bg-rose-100 text-rose-700 border-rose-200 shadow-rose-100',
    Medium: 'bg-amber-100 text-amber-700 border-amber-200 shadow-amber-100',
    Low: 'bg-emerald-100 text-emerald-700 border-emerald-200 shadow-emerald-100',
  };

  const isCompleted = task.status === 'Completed';

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={`relative overflow-hidden rounded-2xl p-6 transition-all duration-300 shadow-lg hover:shadow-xl ${isCompleted ? 'bg-white/40 border-slate-200' : 'glass-card border-white/60'}`}
    >
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="flex items-start gap-4">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onStatusToggle(task)}
            className={`mt-1 flex-shrink-0 transition-colors duration-300 ${isCompleted ? 'text-emerald-500' : 'text-slate-300 hover:text-indigo-500'}`}
          >
            {isCompleted ? <CheckCircle size={24} /> : <Circle size={24} />}
          </motion.button>
          <div>
            <h3 className={`text-lg font-semibold tracking-tight transition-colors duration-300 ${isCompleted ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
              {task.title}
            </h3>
            {task.description && (
              <p className={`text-sm mt-1.5 leading-relaxed line-clamp-2 transition-colors duration-300 ${isCompleted ? 'text-slate-400' : 'text-slate-600'}`}>
                {task.description}
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-1 ml-4 opacity-0 group-hover:opacity-100 lg:opacity-100 transition-opacity">
          <motion.button 
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(99, 102, 241, 0.1)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onEdit(task)} 
            className="p-2 text-slate-400 hover:text-indigo-600 rounded-xl transition-colors"
          >
            <Edit2 size={18} />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(225, 29, 72, 0.1)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDelete(task)} 
            className="p-2 text-slate-400 hover:text-rose-600 rounded-xl transition-colors"
          >
            <Trash2 size={18} />
          </motion.button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-3 mt-5 items-center text-xs font-semibold relative z-10">
        <span className={`px-3 py-1.5 rounded-full border shadow-sm ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
        {task.dueDate && (
          <span className="flex items-center gap-1.5 text-slate-600 bg-white/60 px-3 py-1.5 rounded-full border border-slate-200/60 shadow-sm backdrop-blur-sm">
            <Calendar size={14} className="text-slate-400" />
            {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
        <span className="flex items-center gap-1.5 text-slate-400 ml-auto font-medium">
          <Clock size={14} />
          {new Date(task.createdAt).toLocaleDateString()}
        </span>
      </div>
      
      {/* Decorative gradient blob */}
      {!isCompleted && (
        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-2xl -z-0 pointer-events-none" />
      )}
    </motion.div>
  );
};

export default TaskCard;
