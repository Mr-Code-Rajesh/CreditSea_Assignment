import React, { useEffect } from 'react';
import useReportStore from '../Store/reportStore';
import ReportOverview from '../Components/ReportOverview';
import { motion } from 'framer-motion';

const ReportList = () => {
  const { reports, fetchReports, loading } = useReportStore();

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

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
      ) : reports.length === 0 ? (
        <p className="text-center text-gray-500">No reports found.</p>
      ) : (
        <div className="grid gap-6">
          {reports.map((report) => (
            <ReportOverview key={report._id} report={report} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportList;
