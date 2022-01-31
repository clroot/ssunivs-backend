import httpStatus from 'http-status';
import { Post } from '/models';
import { PostService } from '/service';
import { PostDTO, PostRegisterFormDTO } from '/dto';

/**
 * @swagger
 * /api/v1/post:
 *  post:
 *    tags:
 *      - Post
 *    summary: 게시글 등록
 *    description: description
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/PostRegisterFormDTO'
 *    responses:
 *      201:
 *        description: 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PostDTO'
 *      400:
 *        description: title, content 가 제공되지 않은 경우
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorDTO'
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const register = async (req, res, next) => {
  try {
    const postRegisterDTO = new PostRegisterFormDTO(req.body);
    const postId = await PostService.register({
      payload: postRegisterDTO,
      user: res.locals.auth.user,
    });

    const post = await Post.findByPk(postId);

    res.status(httpStatus.CREATED);
    return res.send(await PostDTO.build(post));
  } catch (err) {
    return next(err);
  }
};