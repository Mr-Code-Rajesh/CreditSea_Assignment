import Report from '../models/reportModel.js';

export const getReports = async (req, res, next) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    next(error);
  }
};
