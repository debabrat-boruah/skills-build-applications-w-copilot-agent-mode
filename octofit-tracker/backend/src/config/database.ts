import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

export async function connectDatabase(): Promise<void> {
  try {
    await mongoose.connect(connectionString, { serverSelectionTimeoutMS: 1000 });
    console.log('Connected to octofit_db');
  } catch (error) {
    console.warn('MongoDB unavailable; API routes will return 503 until it is available.', error);
  }
}

mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

export default mongoose.connection;
