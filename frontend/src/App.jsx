// src/App.jsx
import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import ReportList from './Components/ReportList';
import { motion } from 'framer-motion';
import UploadForm from './Components/UploadForm'
import { Toaster } from "react-hot-toast";

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar onSearch={(query) => setSearchQuery(query)} />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="pt-4">
        <UploadForm />
        <ReportList searchQuery={searchQuery} />
      </motion.main>


      {/* Toast container */}
       <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "10px",
            padding: "12px 16px",
            fontSize: "0.9rem",
            fontWeight: "500",
            color: "#fff",
          },
          success: {
            style: {
              background: "#2563eb", 
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#2563eb",
            },
          },
          error: {
            style: {
              background: "#dc2626",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#dc2626",
            },
          },
          loading: {
            style: {
              background: "#f59e0b",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#f59e0b",
            },
          },
        }}
      />

    </div>
  );
}

export default App;
