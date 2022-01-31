import { DataTypes, Model } from 'sequelize';
import sequelize from '/database';
import User from './user';

class Post extends Model {
  /**
   * @param {Object} payload
   * @param {string} payload.title
   * @param {string} payload.content
   * @param {User} payload.user
   * @return {Promise<Post>}
   */
  static async register({ title, content, user }) {
    let instance = await Post.build();

    instance.title = title;
    instance.content = content;
    instance.writer_id = user.id;

    await instance.save();

    return instance;
  }

  /** @return {number} */
  getId() {
    return this.id;
  }

  /** @return {string} */
  getTitle() {
    return this.title;
  }

  /** @return {string} */
  getContent() {
    return this.content;
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
  indexes: [],
});

export default Post;