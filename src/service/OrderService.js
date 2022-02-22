import { PickUp } from '/models';

class OrderService {
  /**
   * @param {Object} arguments
   * @param {import('/dto').PickUpRegisterFormDTO} arguments.payload
   * @param {import('/models').User} arguments.user
   * @return {Promise<number|string>}
   */
  async registerPickUp({ payload, user }) {
    let pickUp = await PickUp.build();

    pickUp.visitAt = payload.visitAt;
    pickUp.user_id = user.getId();

    await pickUp.save();

    return pickUp.getId();
  }
}

const instance = new OrderService();

export default instance;