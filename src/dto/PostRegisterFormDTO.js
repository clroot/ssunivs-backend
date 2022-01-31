import { InvalidArgumentsException } from '/exception';

/**
 * @swagger
 *  components:
 *    schemas:
 *      PostRegisterFormDTO:
 *        properties:
 *          title:
 *            type: string
 *          content:
 *            type: string
 */
class PostRegisterFormDTO {
  /**
   * @param {import('express').Request.Body} payload
   */
  constructor({ title = '', content = '' }) {
    this.title = title;
    this.content = content;

    if (title === '' || content === '') {
      throw new InvalidArgumentsException('title, content 를 모두 입력해주세요.');
    }
  }
}

export default PostRegisterFormDTO;