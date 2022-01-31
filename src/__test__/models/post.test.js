import { randEmail, randPassword, randSentence, randText, randUserName } from '@ngneat/falso';
import { Post, User } from '/models';
import { createTestUser, initDatabase, removeTestUser } from '/__test__/helper';

describe('Post Model 은', () => {

  const testUserEmail = randEmail();
  const testUsername = randUserName();
  const testUserPassword = randPassword();

  const userPayload = {
    email: testUserEmail,
    username: testUsername,
    password: testUserPassword,
  };

  let testUser;

  beforeAll(async () => {
    await initDatabase();
    await createTestUser(userPayload);
    testUser = await User.findByEmail(testUserEmail);
  });

  afterEach(async () => {
    await removeTestUser(userPayload);
  });

  describe('성공시', () => {
    it('게시글을 저장한다.', async () => {
      // given
      const beforeCounter = await Post.count();
      let title = randText();
      let content = randSentence();

      // when
      const post = await Post.register({
        title,
        content,
        user: testUser,
      });

      // then
      const writer = await post.getWriter();
      const writerPostList = await writer.getPostList();

      expect(await Post.count()).toBeGreaterThan(beforeCounter);
      expect(post.getTitle()).toBe(title);
      expect(post.getContent()).toBe(content);
      expect(writer).toStrictEqual(testUser);
      expect(writerPostList.find(iter => iter.getId() === post.getId())).toBeTruthy();
    });
  });
});