import httpStatus from 'http-status';
import { ReservationDTO } from '/dto';
import { reservation } from '/models';
import { ReservationService } from '/service';
export const register = async(req, res, next) => {
    try {
        const reservationdto = new ReservationDTO(req.body);
        const result = await (ReservationService(reservationdto));
        const reservation_info = await reservation({
            payload: result
        })
        res.status(httpStatus[200]);

        return res.send(reservation_info)
    } catch (err) {
        return next(err);
    }
}