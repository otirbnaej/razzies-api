import 'reflect-metadata';
import './utils/module-alias';

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import CelebrateErrorHandler from '@shared/infra/http/middlewares/CelebrateErrorHandler'
import ErrorHandler from '@shared/infra/http/middlewares/ErrorHandler';
import routes from './routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());

app.use('/', routes);

app.use(CelebrateErrorHandler);
app.use(ErrorHandler);

export default app;