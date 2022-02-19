import { Router } from 'express';
import * as reservationCtrl from './reservation.ctr';

const reservationApi = Router();

reservationApi.post('/', reservationCtrl.register);

export default reservationApi;