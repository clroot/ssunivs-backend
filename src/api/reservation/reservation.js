import { ReservationDTO } from '/dto';
import { reservation } from '/models';
import { ReservationService } from '/service';
export const reservation = async(req, res, next) => {
    try {
        const reservationdto = new ReservationDTO(req.body);
        const result = ReservationService(reservationdto);
    } catch (err) {

    }
}