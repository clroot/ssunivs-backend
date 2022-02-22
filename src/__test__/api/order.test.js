import request from 'supertest';
import httpStatus from 'http-status';
import { randEmail, randFutureDate, randPassword, randUserName } from '@ngneat/falso';
import { closeServer, startServer } from '/index';
import { User } from '/models';
import { createTestUser, getAccessTokenCookies, removeTestUser } from '/__test__/helper';
import { PickUpRegisterFormDTO, UserDTO } from '/dto';

describe('order API 의', () => {
  const apiPrefix = '/api/v1/order';
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

  describe('/pickup 은', () => {
    const route = `${apiPrefix}/pickup`;

    const visitAt = randFutureDate();

    describe('성공시', () => {
      it('PickUpDTO 객체를 return 한다.', async () => {
        // given
        const payload = new PickUpRegisterFormDTO({ visitAt });

        // when
        const { body: pickUpDTO } = await request(server)
          .post(route)
          .set('Cookie', cookies)
          .send(payload)
          .expect(httpStatus.CREATED);

        // then
        expect(pickUpDTO.visitAt).toBe(visitAt.toJSON());
        expect(pickUpDTO.user).toStrictEqual({ ...new UserDTO(testUser) });
      });
    });

    describe('로그인 없이 요청하면', () => {
      it('UNAUTHORIZED 에러가 발생한다.', async () => {
        // given
        const payload = new PickUpRegisterFormDTO({ visitAt });

        // when
        await request(server)
          .post(route)
          .send(payload)
          .expect(httpStatus.UNAUTHORIZED);
      });
    });
  });
});