import { randEmail, randPassword, randSentence, randText, randUserName } from '@ngneat/falso';
import { Board, User } from '/models';
import { createTestUser, initDatabase, removeTestUser } from '/__test__/helper';

describe('Board Model 은', () => {

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
      const beforeCounter = await Board.count();
      let title = randText();
      let content = randSentence();

      // when
      const board = await Board.register({
        title,
        content,
        user: testUser,
      });

      // then
      expect(await Board.count()).toBeGreaterThan(beforeCounter);
      expect(board.getTitle()).toBe(title);
      expect(board.getContent()).toBe(content);
      expect(await board.getWriter()).toStrictEqual(testUser);
    });
  });
});