import { create } from 'zustand';
import axios from 'axios';

const useReportStore = create((set) => ({
  reports: [],
  loading: false,
  error: null,

  fetchReports: async () => {
    try {
      set({ loading: true });
      const res = await axios.get('http://localhost:5000/api/reports');
      set({ reports: res.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  uploadFile: async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      await axios.post('http://localhost:5000/api/upload', formData);
      // refresh data
      const res = await axios.get('http://localhost:5000/api/reports');
      set({ reports: res.data });
    } catch (err) {
      console.error(err);
    }
  }
}));

export default useReportStore;
