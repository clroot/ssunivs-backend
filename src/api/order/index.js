import { Router } from 'express';
import * as orderCtrl from './order.ctrl';

const reservationApi = Router();

reservationApi.post('/pickup', orderCtrl.registerPickUp);

export default reservationApi;