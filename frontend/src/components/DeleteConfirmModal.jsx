import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, taskTitle }) => {
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
            className="glass-modal rounded-[2rem] w-full max-w-sm overflow-hidden relative z-10 border border-white/40"
          >
            <div className="p-8 text-center bg-white/50">
              <h2 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Delete Task?</h2>
              <p className="text-slate-500 mb-8 text-lg">
                Are you sure you want to delete <span className="font-semibold text-slate-700">"{taskTitle}"</span>? This action cannot be undone.
              </p>
              <div className="flex gap-4 w-full">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-3.5 text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl font-semibold transition-colors shadow-sm"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onConfirm}
                  className="flex-1 px-4 py-3.5 bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white rounded-2xl font-semibold shadow-lg shadow-rose-500/30 transition-all border border-white/20"
                >
                  Delete
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DeleteConfirmModal;
