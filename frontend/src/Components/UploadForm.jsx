import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useReportStore from '../Store/reportStore';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const { uploadFile } = useReportStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select an XML file');
    await uploadFile(file);
    alert('File uploaded successfully!');
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center gap-4 p-6 border-2 border-dashed rounded-2xl w-80 mx-auto mt-12"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <input
        type="file"
        accept=".xml"
        onChange={(e) => setFile(e.target.files[0])}
        className="block text-sm text-gray-600 text-center"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Upload XML
      </button>
    </motion.form>
  );
};

export default UploadForm;
