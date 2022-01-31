import { Model } from 'sequelize';

/** @abstract */
class BaseEntity extends Model {

  getId() {
    return this.id;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  getUpdatedAt() {
    return this.updatedAt;
  }
}

export default BaseEntity;