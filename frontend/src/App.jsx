import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import { motion } from 'framer-motion';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-['Outfit']">
        <header className="glass sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-2xl font-bold text-slate-900 tracking-tight"
            >
              TaskTracker
            </motion.h1>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
