/**
 * @swagger
 *  components:
 *    schemas:
 *      PickUpDTO:
 *        properties:
 *         visitAt:
 *            type: string
 *         user:
 *            $ref: '#/components/schemas/UserDTO'
 */
import UserDTO from './UserDTO';

class PickUpDTO {
  /**
   * @private
   * @param {import('/models').PickUp} payload
   * @param {import('/models').User} user
   */
  constructor(payload, user) {
    this.visitAt = payload.getVisitAt();
    this.user = new UserDTO(user);
  }

  /**
   * @param {import('/models').PickUp} payload
   * @return {Promise<PickUpDTO>}
   */
  static async build(payload) {
    const user = await payload.getUser();
    return new PickUpDTO(payload, user);
  }
}

export default PickUpDTO;