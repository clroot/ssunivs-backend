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
     * @param {import('/models').User} reserver
     * @private
     */
    constructor(reservation, reserver) {
        this.dateandtime = reservation.getdatetime()
        this.user = UserDTO(reserver)
    }
}

export default ReservationDTO;