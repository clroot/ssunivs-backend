import { InvalidArgumentsException } from '/exception';
/**
 * @swagger
 *  components:
 *    schemas:
 *      ReservationDTO:
 *        properties:
 *          date:
 *            type: string
 *          createdAt:
 *            type: date
 *          updatedAt:
 *            type: date
 */
class ReservationDTO {
    /**
     * @param {import('express').Request.Body} payload
     */
    constructor(payload, response) {
        this.dateandtime = payload.dateandtime
        this.user = response.locals.auth.user()
        if (!this.dateandtime) {
            throw new InvalidArgumentsException('날짜를 선택해 주세요');
        }
    }
}

export default ReservationDTO;