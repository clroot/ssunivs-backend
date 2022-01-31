import { Router } from 'express';
import * as authCtrl from './auth.ctrl';
import { isLoggedIn, isNotLoggedIn } from '../../lib/middleware';

const authApi = Router();

authApi.post('/login', isNotLoggedIn, authCtrl.login);
authApi.post('/logout', isLoggedIn, authCtrl.logout);
authApi.get('/check', isLoggedIn, authCtrl.check);

export default authApi;