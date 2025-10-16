import React from 'react';
import UploadForm from './components/UploadForm';
import ReportList from './components/ReportList';
import { motion } from 'framer-motion';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-center text-blue-700 pt-8">
       <motion.span initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
        CreditSea - Credit Report Dashboard
       </motion.span>
      </h1>
      <UploadForm />
      <ReportList />
    </div>
  );
};

export default App;
