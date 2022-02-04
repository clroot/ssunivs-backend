import UserDTO from './UserDTO';
/**
 * @swagger
 *  components:
 *    schemas:
 *      ReservationDTO:
 *        properties:
 *          date:
 *            type: datetime
 *          reserver:
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
    constructor(reservation, writer) {
        this.dateandtime = reservation.getdatetime()
        this.reserver = UserDTO(reserver)
    }
}

export default ReservationDTO;