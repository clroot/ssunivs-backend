import { Router } from 'express';
import * as postCtrl from './post.ctrl';

const postApi = Router();

postApi.post('/', postCtrl.register);

export default postApi;