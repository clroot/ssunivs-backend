import { Post } from '/models';

class PostService {
  /**
   * @param {Object} argument
   * @param {import('/dto').PostRegisterFormDTO} argument.payload
   * @param {import('/models').User} argument.user
   * @return {Promise<number|string>}
   */
  async register({ payload, user }) {
    let post = await Post.build();

    post.title = payload.title;
    post.content = payload.content;
    post.writer_id = user.id;

    await post.save();

    return post.getId();
  }
}

const instance = new PostService();

export default instance;