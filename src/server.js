import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'; 
import { errors } from 'celebrate';
import { logger } from './middleware/logger.js';

import { connectMongoDB } from './db/connectMongoDB.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

import notesRouter from './routes/notesRoutes.js';
import authRouter from './routes/authRoutes.js'; 

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser()); 
app.use(logger);

app.use(authRouter); 
app.use(notesRouter);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

const startServer = async () => {
  await connectMongoDB();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();