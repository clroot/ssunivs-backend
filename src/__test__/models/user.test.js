import { randEmail, randPassword, randUserName } from '@ngneat/falso';
import { User, UserRole } from '/models';
import { createTestUser, initDatabase, removeTestUser } from '/__test__/helper';

describe('User Model 은', () => {

  const testUserEmail = randEmail();
  const testUsername = randUserName();
  const testUserPassword = randPassword();

  const userPayload = {
    email: testUserEmail,
    username: testUsername,
    password: testUserPassword,
  };

  beforeAll(async () => {
    await initDatabase();
  });

  afterEach(async () => {
    await removeTestUser(userPayload);
  });

  it('email, username, password 필드를 가진다', async () => {
    // given
    const beforeCount = await User.count();

    // when
    let user = await User.create(userPayload);
    await user.setPassword(testUserPassword);

    // then
    expect(await User.count()).toBeGreaterThan(beforeCount);
    expect(user.getUsername()).toBe(testUsername);
    expect(user.getEmail()).toBe(testUserEmail);
    expect(user.getRole()).toBe(UserRole.USER);
    expect(await user.checkPassword(testUserPassword)).toBeTruthy();
  });

  it('findByPk 메서드 테스트', async () => {
    // given
    const userId = await createTestUser(userPayload);

    // when
    const user = await User.findByPk(userId);

    // then
    expect(user.getUsername()).toBe(testUsername);
  });

  it('findByEmail 메서드 테스트', async () => {
    // given
    await createTestUser(userPayload);

    // when
    const user = await User.findByEmail(testUserEmail);

    // then
    expect(user.getUsername()).toBe(testUsername);
  });
});