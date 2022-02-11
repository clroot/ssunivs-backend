import { response } from 'express';
import UserDTO from './UserDTO';
/**
 * @swagger
 *  components:
 *    schemas:
 *      ReservationDTO:
 *        properties:
 *          date:
 *            type: string
 *          user:
 *            $ref: '#/components/schemas/UserDTO'
 *          createdAt:
 *            type: date
 *          updatedAt:
 *            type: date
 */
class ReservationDTO {
    /**
     * @param {import('/models').reservation} reservation
     * @private
     */
    constructor(reservation) {
        this.dateandtime = reservation.getdatetime()
        this.user = response.locals.auth.user()
    }
}

export default ReservationDTO;