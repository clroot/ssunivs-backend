import httpStatus from 'http-status';
import { Post } from '/models';
import { PostService } from '/service';
import { PageRequestDTO, PostDTO, PostListDTO, PostRegisterFormDTO } from '/dto';
import { AuthenticationException, PostNotFoundException } from '/exception';

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

/**
 * @swagger
 * /api/v1/post:
 *  get:
 *    tags:
 *      - Post
 *    summary: Post List
 *    description: Post 리스트 조회
 *    parameters:
 *      - in: query
 *        name: page
 *        required: true
 *        schema:
 *          type: string
 *          default: 1
 *      - in: query
 *        name: size
 *        required: true
 *        schema:
 *          type: string
 *          default: 30
 *    responses:
 *      200:
 *        description: Post 리스트 조회 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PostListDTO'
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const list = async (req, res, next) => {
  const pageRequestDTO = PageRequestDTO.of(req.query);
  try {
    const postList = await Post.findAll({
      ...pageRequestDTO.toQuery(),
    });
    const postCount = await Post.count();

    return res.send(new PostListDTO({
      pageRequestDTO,
      content: await Promise.all(postList.map((iter => PostDTO.build(iter)))),
      totalElements: postCount,
    }));
  } catch (err) {
    return next(err);
  }
};

/**
 * @swagger
 * /api/v1/post/:id:
 *  get:
 *    tags:
 *      - Post
 *    summary: get one Post
 *    description: Post 조회
 *    parameters:
 *      - in: path
 *        name: int
 *        required: true
 *        schema:
 *          type: string
 *          default: 1
 *    responses:
 *      200:
 *        description: 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PostDTO'
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const get = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await Post.findByPk(id);
    if (post == null) {
      return next(new PostNotFoundException());
    }
    return res.json(await PostDTO.build(post));
  } catch (err) {
    return next(err);
  }
};

/**
 * @swagger
 * /api/v1/post/:id:
 *  delete:
 *    tags:
 *      - Post
 *    summary: delete one Post
 *    description: Post 삭제
 *    parameters:
 *      - in: path
 *        name: int
 *        required: true
 *        schema:
 *          type: string
 *          default: 1
 *    responses:
 *      204:
 *        description: Post 삭제
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    if (post == null) {
      return next(new PostNotFoundException());
    }

    if ((await post.getWriter()).getId() !== res.locals.auth.user.getId()) {
      return next(new AuthenticationException('삭제할 권한이 없습니다.'));
    }

    await Post.destroy({
      where: {
        post_id: id,
      },
    });
    return res.status(httpStatus.NO_CONTENT);
  } catch (err) {
    return next(err);
  }
};