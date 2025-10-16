import React from 'react';
import { motion } from 'framer-motion';

// helper to decide color based on score
const getScoreColor = (score) => {
  if (score >= 750) return 'text-green-600 bg-green-100';
  if (score >= 650) return 'text-yellow-600 bg-yellow-100';
  return 'text-red-600 bg-red-100';
};

const ReportOverview = ({ report }) => {
  const { name, mobile, pan, creditScore, summary } = report;

  const scoreColor = getScoreColor(creditScore);

  return (
    <motion.div
      className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
        <h3 className="text-2xl font-semibold text-blue-700">
          {name || 'Unknown Applicant'}
        </h3>
        <span className={`px-4 py-1 text-sm font-bold rounded-full ${scoreColor}`}>
          Credit Score: {creditScore || '—'}
        </span>
      </div>

      <div className="text-gray-600 mb-2">
        <p><strong>Mobile:</strong> {mobile || 'N/A'}</p>
        <p><strong>PAN:</strong> {pan || 'N/A'}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm text-gray-700 mt-3">
        <div><strong>Total Accounts:</strong> {summary.totalAccounts}</div>
        <div><strong>Active Accounts:</strong> {summary.activeAccounts}</div>
        <div><strong>Closed Accounts:</strong> {summary.closedAccounts}</div>
        <div><strong>Current Balance:</strong> ₹{summary.currentBalance}</div>
        <div><strong>Secured Amount:</strong> ₹{summary.securedAmount}</div>
        <div><strong>Unsecured Amount:</strong> ₹{summary.unsecuredAmount}</div>
        <div><strong>Enquiries (7 Days):</strong> {summary.enquiriesLast7Days}</div>
      </div>
    </motion.div>
  );
};

export default ReportOverview;
