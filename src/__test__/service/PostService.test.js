import { randEmail, randPassword, randSentence, randText, randUserName } from '@ngneat/falso';
import { Post, User } from '/models';
import { PostService } from '/service';
import { PostRegisterFormDTO } from '/dto';
import { createTestUser, initDatabase, removeTestUser } from '/__test__/helper';

describe('PostService 의', () => {

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
    const userId = await createTestUser(userPayload);
    testUser = await User.findByPk(userId);
  });

  afterAll(async () => {
    await removeTestUser(userPayload);
  });

  describe('register 메서드는', () => {
    describe('성공시', () => {
      it('postId를 return 한다.', async () => {
        // given
        const title = randText();
        const content = randSentence();
        const payload = new PostRegisterFormDTO({
          title,
          content,
        });

        // when
        const postId = await PostService.register({ payload, user: testUser });

        // then
        const post = await Post.findByPk(postId);
        const writer = await post.getWriter();
        expect(post.getTitle()).toBe(title);
        expect(post.getContent()).toBe(content);
        expect(writer.getId()).toStrictEqual(testUser.getId());
      });
    });
  });
});