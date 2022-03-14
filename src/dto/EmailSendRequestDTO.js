/**
 * @swagger
 *  components:
 *    schemas:
 *      EmailSendRequestDTO:
 *        properties:
 *          to:
 *            type: string
 *          title:
 *            type: string
 *          body:
 *            type: string
 *          from:
 *            type: string
 */
class EmailSendRequestDTO {
  /**
   * @param {Object} payload
   * @param {String} payload.to
   * @param {String} payload.title
   * @param {String} payload.body
   * @param {String} payload.from
   */
  constructor(payload) {
    const { to, title, body, from = 'admin@clroot.io' } = payload;
    this.to = to;
    this.title = title;
    this.body = body;
    this.from = from;
  }
}

export default EmailSendRequestDTO;