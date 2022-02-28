import { Router } from 'express';
import * as postCtrl from './post.ctrl';

const postApi = Router();

postApi.post('/', postCtrl.register);
postApi.get('/', postCtrl.list);
postApi.get('/:id', postCtrl.get);
postApi.delete('/:id', postCtrl.remove);

export default postApi;