import { DataTypes } from 'sequelize';
import sequelize from '/database';
import BaseEntity from './BaseEntity';
import User from './user';

class PickUp extends BaseEntity {
  static async findByUser(userId) {
    return await PickUp.findAll({
      where: {
        user_id: userId,
      },
    });
  }

  getId() {
    return this.id;
  }

  getVisitAt() {
    return this.visitAt;
  }

  async getUser() {
    return await User.findByPk(this.user_id);
  }
}

PickUp.init({
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    field: 'pick_up_id',
  },
  visitAt: {
    type: DataTypes.DATE,
    notNull: true,
  },
}, {
  sequelize,
  modelName: 'PickUp',
  tableName: 'order_pick_up',
  indexes: [
    {
      fields: ['user_id'],
      unique: false,
    },
  ],
});

export default PickUp;