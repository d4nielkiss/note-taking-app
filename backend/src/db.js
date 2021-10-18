import mongoose from 'mongoose';
import { config } from './config';

const { dbConnection } = config;

export const connectToDb = async () => {
  try {
    await mongoose.connect(dbConnection, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(`Error on db start: ${err.message}`);
    process.exit(1);
  }
};
