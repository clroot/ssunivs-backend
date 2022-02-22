import { Router } from 'express';
import { serve as swaggerServe, setup as swaggerSetup } from 'swagger-ui-express';
import { isLoggedIn } from '/lib/middleware';
import swaggerSpecs from '/lib/swagger';
import adminApi from './admin';
import authApi from './auth';
import postApi from './post';
import userApi from './user';
import orderApi from './order';

const api = Router();

api.use('/admin', isLoggedIn, adminApi);
api.use('/auth', authApi);
api.use('/post', isLoggedIn, postApi);
api.use('/user', userApi);
api.use('/order', isLoggedIn, orderApi);
api.use('/docs', swaggerServe, swaggerSetup(swaggerSpecs, { explorer: true }));

export default api;