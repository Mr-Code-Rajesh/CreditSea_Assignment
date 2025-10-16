// src/App.jsx
import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import ReportList from './Components/ReportList';
import { motion } from 'framer-motion';
import UploadForm from './Components/UploadForm'

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar stays on top */}
      <Navbar onSearch={(query) => setSearchQuery(query)} />

      {/* Animated route container (optional) */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="pt-4"
      >
        
        <UploadForm />
        {/* Pass searchQuery to ReportList */}
        <ReportList searchQuery={searchQuery} />
      </motion.main>
    </div>
  );
}

export default App;
