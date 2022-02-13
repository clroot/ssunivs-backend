import { response } from 'express';
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
     * @param {import('express').Request.Body} payload
     */
    constructor(payload) {
        this.dateandtime = payload.dateandtime
        this.user = response.locals.auth.user()
    }
}

export default ReservationDTO;