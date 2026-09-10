import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = 8000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-tracker-backend' });
});

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB at', mongoUri);
    app.listen(port, () => {
      console.log(`OctoFit Tracker API running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  });
