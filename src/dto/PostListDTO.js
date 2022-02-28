import PageDTO from './PageDTO';

/**
 * @swagger
 *  components:
 *    schemas:
 *      PostItem:
 *        properties:
 *          title:
 *            type: string
 *          writer:
 *            $ref: '#/components/schemas/UserDTO'
 *          createdAt:
 *            type: date
 */
class PostItem {
  /**
   *
   * @param {import('/dto').PostDTO} payload
   */
  constructor(payload) {
    const { title, writer, createdAt } = payload;
    this.title = title;
    this.writer = writer;
    this.createdAt = createdAt;
  }
}

/**
 * @swagger
 *  components:
 *    schemas:
 *      PostListDTO:
 *        properties:
 *          content:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/PostItem'
 *          pageable:
 *           type: object
 *           properties:
 *            pageNumber:
 *              type: int
 *              default: 1
 *            pageSize:
 *              type: int
 *              default: 30
 */
class PostListDTO extends PageDTO {
  /**
   * @constructor
   * @param {Object} payload
   * @param {PageRequestDTO} payload.pageRequestDTO
   * @param {Array} payload.content
   * @param {number} payload.totalElements
   */
  constructor(payload) {
    super(payload);
    this.content.map(iter => new PostItem(iter));
  }
}

export default PostListDTO;