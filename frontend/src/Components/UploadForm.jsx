import React, { useState } from "react";
import { motion } from "framer-motion";
import useReportStore from "../Store/reportStore";
import toast from "react-hot-toast";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const { uploadFile } = useReportStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("⚠️ Please select an XML file first!");
      return;
    }

    await toast.promise(uploadFile(file), {
      loading: "📤 Uploading your XML file...",
      success: "✅ File uploaded successfully!",
      error: "❌ Upload failed. Please try again.",
    });

    setFile(null);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center gap-4 p-6 border-2 border-dashed rounded-2xl w-80 mx-auto mt-12 bg-white shadow-md"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <input
        type="file"
        accept=".xml"
        onChange={(e) => setFile(e.target.files[0])}
        className="block text-sm text-gray-600 text-center file:mr-4 file:py-2 file:px-4
                 file:rounded-full file:border-0
                 file:text-sm file:font-semibold
                 file:bg-blue-50 file:text-blue-700
                 hover:file:bg-blue-100"
      />

      <motion.button
        type="submit"
        whileTap={{ scale: 0.95 }}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Upload XML
      </motion.button>
    </motion.form>
  );
};

export default UploadForm;
