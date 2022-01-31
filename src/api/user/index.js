import { Router } from 'express';
import * as userCtrl from './user.ctrl';
import { isNotLoggedIn } from '../../lib/middleware';

const userApi = Router();

userApi.post('/register', isNotLoggedIn, userCtrl.register);

export default userApi;