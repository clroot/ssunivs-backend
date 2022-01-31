import { Router } from 'express';
import * as postCtrl from './post.ctrl';
import { isLoggedIn } from '/lib/middleware';

const postApi = Router();

postApi.use(isLoggedIn);
postApi.post('/', postCtrl.register);

export default postApi;