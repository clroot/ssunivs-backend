import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import api from '/api';
import { stream } from '/logger';
import { customErrorHandler, notFoundErrorHandler } from '/exception';
import { consumeUser } from '/lib/middleware';

const app = express();

app.use(morgan(process.env.LOG_LEVEL || 'dev', { stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(consumeUser);
app.use('/api/v1', api);
app.get('/', (req, res) => {
  return res.redirect('/api/v1/docs');
});
app.use(customErrorHandler);
app.use(notFoundErrorHandler);

export default app;