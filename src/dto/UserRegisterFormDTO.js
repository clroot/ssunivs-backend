import { InvalidArgumentsException } from '/exception';

/**
 * @swagger
 *  components:
 *    schemas:
 *      UserRegisterFormDTO:
 *        properties:
 *          email:
 *            type: string
 *            default: test@email.com
 *          username:
 *            type: string
 *            default: test-user
 *          password:
 *            type: string
 *            default: test-password
 */
class UserRegisterFormDTO {
  /**
   * @param {Object} payload
   * @param {string} payload.email
   * @param {string} payload.username
   * @param {string} payload.password
   * @throws {IllegalStateException}
   */
  constructor(payload) {
    this.email = payload.email;
    this.username = payload.username;
    this.password = payload.password;

    if (!this.email || !this.username || !this.password) {
      throw new InvalidArgumentsException('email, username, password 를 모두 입력해주세요.');
    }
  }
}

export default UserRegisterFormDTO;