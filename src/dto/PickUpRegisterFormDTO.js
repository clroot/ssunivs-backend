import { InvalidArgumentsException } from '/exception';

/**
 * @swagger
 *  components:
 *    schemas:
 *      PickUpRegisterFormDTO:
 *        properties:
 *          visitAt:
 *            type: string
 */
class PickUpRegisterFormDTO {
  /**
   * @param {Object} payload
   * @param {Date|String} payload.visitAt
   * @private
   */
  constructor(payload) {
    const { visitAt } = payload;

    try {
      this.visitAt = new Date(visitAt);
    } catch (err) {
      throw new InvalidArgumentsException('옳바른 날짜 형식을 입력해주세요.');
    }

    if (!this.visitAt) {
      throw new InvalidArgumentsException('날짜를 입력해주세요.');
    }
  }
}

export default PickUpRegisterFormDTO;