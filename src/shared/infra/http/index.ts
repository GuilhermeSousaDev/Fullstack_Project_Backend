import 'reflect-metadata';
import 'express-async-errors';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import AppError from '../errors/AppError';
import router from './routes/index.routes';
import '../../typeorm';
import '../container';
import { uploadConfig } from '../../../config/upload';
import { limiter } from './middlewares/rateLimiter';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(limiter);

app.use(router);
app.use('/files', express.static(uploadConfig.directory));

app.use(errors());
app.use(AppError.errorMiddleware);

app.listen(8081, () => console.log("Iniciado com Sucesso"));