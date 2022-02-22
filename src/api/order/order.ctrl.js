import httpStatus from 'http-status';
import { PickUpDTO, PickUpRegisterFormDTO } from '/dto';
import { OrderService } from '/service';
import { PickUp } from '/models';

/**
 * @swagger
 * /api/v1/order/pickup:
 *  post:
 *    tags:
 *      - Order
 *    summary: 방문수령 예약
 *    description: description
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/PickUpRegisterFormDTO'
 *    responses:
 *      201:
 *        description: 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PickUpDTO'
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const registerPickUp = async (req, res, next) => {
  try {
    const pickUpRegisterFormDTO = new PickUpRegisterFormDTO(req.body);

    const createdPickUpId = await OrderService.registerPickUp({
      payload: pickUpRegisterFormDTO,
      user: res.locals.auth.user,
    });
    const pickUp = await PickUp.findByPk(createdPickUpId);

    res.status(httpStatus.CREATED);
    return res.json(await PickUpDTO.build(pickUp));
  } catch (err) {
    return next(err);
  }
};