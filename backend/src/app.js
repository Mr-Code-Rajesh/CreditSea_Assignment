import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import uploadRoutes from './routes/uploadRoutes.js';
import reportRoutes from './routes/reportRoutes.js';

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "https://creditsea-assignment-rajesh.vercel.app"],
  methods: ["GET", "POST"]
}));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/upload', uploadRoutes);
app.use('/api/reports', reportRoutes);

app.get('/', (req, res) => {
  res.send('🚀 Backend Working Fine!');
});

export default app;
