import { create } from 'zustand';
import axios from 'axios';

const useReportStore = create((set) => ({
  reports: [],
  loading: false,
  error: null,

  fetchReports: async () => {
    try {
      set({ loading: true });
      const res = await axios.get('https://creditsea-assignment-r1z0.onrender.com/api/reports');
      set({ reports: res.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  uploadFile: async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      await axios.post('https://creditsea-assignment-r1z0.onrender.com/api/upload', formData);
      // refresh data
      const res = await axios.get('https://creditsea-assignment-r1z0.onrender.com/api/reports');
      set({ reports: res.data });
    } catch (err) {
      console.error(err);
    }
  }
}));

export default useReportStore;
