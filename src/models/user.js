import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import sequelize from '/database';
import Post from './post';
import BaseEntity from './BaseEntity';

/**
 * Enum for User Role
 * @enum {string}
 * */
export const Role = {
  USER: 'ROLE_USER',
  ADMIN: 'ROLE_ADMIN',
};

class User extends BaseEntity {
  /**
   * @param {string} email
   * @return {Promise<User>}
   * */
  static async findByEmail(email) {
    return await User.findOne({
      where: {
        email,
      },
    });
  }

  /** @return {string} */
  getUsername() {
    return this.username;
  }

  /** @return {string} */
  getEmail() {
    return this.email;
  }

  /** @return {string} */
  getRole() {
    return this.role;
  }

  /** @return {Promise<Array<Post>>} */
  async getPostList() {
    return await Post.findByWriter(this.getId());
  }

  /**
   * set user password as hashed
   * @param {string} password
   * @return {Promise<>}
   * */
  async setPassword(password) {
    this.password = await bcrypt.hash(password, 10);
    await this.save();
  }

  /**
   * compare given password with User's hashed password
   * @param {string} password
   * @return {Promise<Boolean>} password compare result
   * */
  async checkPassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}

User.init({
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    field: 'user_id',
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.ENUM({
      values: Object.values(Role),
    }),
    defaultValue: Role.USER,
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  indexes: [
    {
      unique: true,
      fields: ['email'],
    },
  ],
});

export default User;