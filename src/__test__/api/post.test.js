import request from 'supertest';
import httpStatus from 'http-status';
import { randEmail, randPassword, randSentence, randText, randUserName } from '@ngneat/falso';
import { closeServer, startServer } from '/index';
import { User } from '/models';
import { createTestUser, getAccessTokenCookies, removeTestUser } from '/__test__/helper';
import { PostRegisterFormDTO, UserDTO } from '../../dto';

describe('post API 의', () => {
  const apiPrefix = '/api/v1/post';
  let server;

  const testUserEmail = randEmail();
  const testUsername = randUserName();
  const testUserPassword = randPassword();

  const userPayload = {
    email: testUserEmail,
    username: testUsername,
    password: testUserPassword,
  };

  let testUser;
  let cookies;

  beforeAll(async () => {
    server = await startServer();
    const userId = await createTestUser(userPayload);
    testUser = await User.findByPk(userId);
    cookies = await getAccessTokenCookies(server, userPayload);
  });

  afterAll(async () => {
    await removeTestUser(userPayload);
    await closeServer(server);
  });

  describe('POST / 요청은', () => {
    const route = `${apiPrefix}/`;

    const title = randText();
    const content = randSentence();

    describe('성공시', () => {
      it('PostDTO 객체를 return 한다.', async () => {
        // given
        const payload = new PostRegisterFormDTO({ title, content });

        // when
        const { body: postDTO } = await request(server)
          .post(route)
          .set('Cookie', cookies)
          .send(payload)
          .expect(httpStatus.CREATED);

        // then
        expect(postDTO.title).toBe(title);
        expect(postDTO.content).toBe(content);
        expect(postDTO.writer).toStrictEqual({ ...new UserDTO(testUser) });
      });
    });

    describe('로그인 없이 요청하면', () => {
      it('UNAUTHORIZED 에러가 발생한다.', async () => {
        // given
        const payload = new PostRegisterFormDTO({ title, content });
        await request(server)
          .post(route)
          .send(payload)
          .expect(httpStatus.UNAUTHORIZED);
      });
    });
  });
});