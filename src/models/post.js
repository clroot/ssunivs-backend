import { DataTypes } from 'sequelize';
import sequelize from '/database';
import User from './user';
import BaseEntity from './BaseEntity';

class Post extends BaseEntity {
  static async findByWriter(writerId) {
    return await Post.findAll({
      where: {
        writer_id: writerId,
      },
    });
  }

  /** @return {number,string} */
  getId() {
    return this.id;
  }

  /** @return {string} */
  getTitle() {
    return this.title;
  }

  /** @return {string} */
  getContent() {
    return this.content.toString('utf8');
  }

  /** @return {Promise<User>} */
  async getWriter() {
    return await User.findByPk(this.writer_id);
  }
}

Post.init({
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    field: 'post_id',
  },
  title: {
    type: DataTypes.STRING,
  },
  content: {
    type: DataTypes.BLOB,
  },
}, {
  sequelize,
  modelName: 'Post',
  tableName: 'posts',
  indexes: [
    {
      fields: ['writer_id'],
      unique: false,
    },
  ],
});

export default Post;