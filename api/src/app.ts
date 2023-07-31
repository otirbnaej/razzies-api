import 'reflect-metadata';
import './utils/module-alias';

import '@config/env';

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import routes from './shared/infra/http/routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());

app.use('/', routes);

export default app;
