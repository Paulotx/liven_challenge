import 'reflect-metadata';
import 'dotenv/config';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import { AppError } from '@shared/errors/AppError';
import createConnection from '@shared/infra/typeorm';

import '@shared/container';
import swaggerFile from '../../../swagger.json';
import routes from './routes';

createConnection('database');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ message: err.message });
  }

  return response.status(500).json(`Internal server error - ${err.message}`);
});

export default app;
