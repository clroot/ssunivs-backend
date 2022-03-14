import UserDTO from './UserDTO';

/**
 * @swagger
 *  components:
 *    schemas:
 *      PostDTO:
 *        properties:
 *          id:
 *            type: number
 *          title:
 *            type: string
 *          content:
 *            type: string
 *          writer:
 *            $ref: '#/components/schemas/UserDTO'
 *          createdAt:
 *            type: date
 *          updatedAt:
 *            type: date
 */
class PostDTO {
  /**
   * @param {import('/models').Post} payload
   * @param {import('/models').User} writer
   * @private
   */
  constructor(payload, writer) {
    this.id = payload.getId();
    this.title = payload.getTitle();
    this.content = payload.getContent();
    this.writer = new UserDTO(writer);
    this.createdAt = payload.getCreatedAt();
    this.updatedAt = payload.getUpdatedAt();
  }

  /**
   * @param {import('/models').Post} payload
   */
  static async build(payload) {
    const writer = await payload.getWriter();
    return new PostDTO(payload, writer);
  }
}

export default PostDTO;