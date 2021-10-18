import dotenv from 'dotenv';

dotenv.config();

export const config = {
  app: {
    port: process.env.PORT,
  },
  dbConnection: process.env.MONGO_URL,
};
