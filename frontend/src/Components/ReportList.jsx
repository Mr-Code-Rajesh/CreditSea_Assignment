// src/Components/ReportList.jsx
import React, { useEffect, useState } from 'react';
import useReportStore from '../Store/reportStore';
import ReportOverview from './ReportOverview';
import { motion } from 'framer-motion';

const ReportList = ({ searchQuery }) => {
  const { reports, fetchReports, loading } = useReportStore();
  const [filteredReports, setFilteredReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  useEffect(() => {
    // Filter reports based on search query
    if (!searchQuery.trim()) {
      setFilteredReports(reports);
      return;
    }

    const lower = searchQuery.toLowerCase();
    const filtered = reports.filter(
      (r) =>
        r.name?.toLowerCase().includes(lower) ||
        r.pan?.toLowerCase().includes(lower) ||
        String(r.creditScore).includes(lower)
    );
    setFilteredReports(filtered);
  }, [searchQuery, reports]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-blue-700">Credit Reports</h2>

        <motion.button
          onClick={fetchReports}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          whileTap={{ scale: 0.95 }}
        >
          🔄 Refresh
        </motion.button>
      </div>

      {loading ? (
        <p className="text-center mt-8 text-gray-500">Loading reports...</p>
      ) : filteredReports.length === 0 ? (
        <p className="text-center text-gray-500">No reports found.</p>
      ) : (
        <motion.div
          layout
          className="grid gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {filteredReports.map((report) => (
            <motion.div
              key={report._id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ReportOverview report={report} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default ReportList;
