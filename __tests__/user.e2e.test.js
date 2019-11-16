import user, {
  createUser,
  createPinCode,
  authorizeUserByCredentials,
  authorizeUserByPinCode,
  multiAccountSelect,
  updateUserLogin,
  updateUserPassword,
  updateUserPinCode
} from '../src/redux/features/userFeatureSlice';

describe('Create users', () => {
  it('should create new user', () => {
    const login1 = 'Luke';
    const password1 = 'skywalker';

    const luke_skywalker = {
      type: createUser.type,
      payload: {
        login: login1,
        password: password1
      }
    };

    expect(user([], luke_skywalker)).toEqual([
      {
        login: login1,
        password: password1,
        passwordHash: `test-${password1}`,
        id: `test-${login1}`,
        active: true,
        notifications: true,
        pinCode: null,
        fingerprint: false,
        avatar: null,
        multiAccountSelect: false,
        permissionsToUpdatePassword: false
      }
    ]);
  });

  it('should create new user, so we have to users and the last one is active', () => {
    const login1 = 'Luke';
    const password1 = 'skywalker';

    const login2 = 'Obi-Van';
    const password2 = 'kenobi';

    const obi_van_kenobi = {
      type: createUser.type,
      payload: {
        login: login2,
        password: password2
      }
    };

    expect(
      user(
        [
          {
            login: login1,
            password: password1,
            passwordHash: `test-${password1}`,
            id: `test-${login1}`,
            active: true,
            notifications: true,
            pinCode: null,
            fingerprint: false,
            avatar: null,
            multiAccountSelect: false,
            permissionsToUpdatePassword: false
          }
        ],
        obi_van_kenobi
      )
    ).toEqual([
      {
        login: login1,
        password: password1,
        passwordHash: `test-${password1}`,
        id: `test-${login1}`,
        active: false,
        notifications: true,
        pinCode: null,
        fingerprint: false,
        avatar: null,
        multiAccountSelect: false,
        permissionsToUpdatePassword: false
      },
      {
        passwordHash: `test-${password2}`,
        id: `test-${login2}`,
        login: login2,
        password: password2,
        active: true,
        notifications: true,
        pinCode: null,
        fingerprint: false,
        avatar: null,
        multiAccountSelect: false,
        permissionsToUpdatePassword: false
      }
    ]);
  });

  it('should create PIN-CODE to existing user', () => {
    const login1 = 'Luke';
    const password1 = 'skywalker';
    const pinCode = '0000';
    const create_pin_code = {
      type: createPinCode.type,
      payload: {
        login: login1,
        pinCode
      }
    };

    expect(
      user(
        [
          {
            login: login1,
            password: password1,
            passwordHash: `test-${password1}`,
            id: `test-${login1}`,
            active: true,
            notifications: true,
            pinCode: null,
            fingerprint: false,
            avatar: null,
            multiAccountSelect: false,
            permissionsToUpdatePassword: false
          }
        ],
        create_pin_code
      )
    ).toEqual([
      {
        login: login1,
        password: password1,
        passwordHash: `test-${password1}`,
        id: `test-${login1}`,
        active: true,
        notifications: true,
        pinCode,
        fingerprint: false,
        avatar: null,
        multiAccountSelect: false,
        permissionsToUpdatePassword: false
      }
    ]);
  });

  it('should create PIN-CODE to existing user with two users created', () => {
    const login1 = 'Luke';
    const password1 = 'skywalker';

    const login2 = 'Obi-Van';
    const password2 = 'kenobi';

    const pinCode = '0000';
    const create_pin_code = {
      type: createPinCode.type,
      payload: {
        login: login1,
        pinCode
      }
    };

    expect(
      user(
        [
          {
            login: login1,
            password: password1,
            passwordHash: `test-${password1}`,
            id: `test-${login1}`,
            active: true,
            notifications: true,
            pinCode: null,
            fingerprint: false,
            avatar: null,
            multiAccountSelect: false,
            permissionsToUpdatePassword: false
          },
          {
            passwordHash: `test-${password2}`,
            id: `test-${login2}`,
            login: login2,
            password: password2,
            active: false,
            notifications: true,
            pinCode: '0000',
            fingerprint: false,
            avatar: null,
            multiAccountSelect: false,
            permissionsToUpdatePassword: false
          }
        ],
        create_pin_code
      )
    ).toEqual([
      {
        login: login1,
        password: password1,
        passwordHash: `test-${password1}`,
        id: `test-${login1}`,
        active: true,
        notifications: true,
        pinCode,
        fingerprint: false,
        avatar: null,
        multiAccountSelect: false,
        permissionsToUpdatePassword: false
      },
      {
        passwordHash: `test-${password2}`,
        id: `test-${login2}`,
        login: login2,
        password: password2,
        active: false,
        notifications: true,
        pinCode: '0000',
        fingerprint: false,
        avatar: null,
        multiAccountSelect: false,
        permissionsToUpdatePassword: false
      }
    ]);
  });
});

describe('Authorize users', () => {
  it('should authorize only user by credentials', () => {
    const login1 = 'Luke';
    const password1 = 'skywalker';

    const authorize_luke_skywalker = {
      type: authorizeUserByCredentials.type,
      payload: {
        login: login1,
        password: password1
      }
    };

    expect(
      user(
        [
          {
            login: login1,
            password: password1,
            passwordHash: `test-${password1}`,
            id: `test-${login1}`,
            active: false,
            notifications: true,
            pinCode: null,
            fingerprint: false,
            avatar: null,
            multiAccountSelect: false,
            permissionsToUpdatePassword: false
          }
        ],
        authorize_luke_skywalker
      )
    ).toEqual([
      {
        login: login1,
        password: password1,
        passwordHash: `test-${password1}`,
        id: `test-${login1}`,
        active: true,
        notifications: true,
        pinCode: null,
        fingerprint: false,
        avatar: null,
        multiAccountSelect: false,
        permissionsToUpdatePassword: false
      }
    ]);
  });

  it('should authorize user by credentials with two users existed', () => {
    const login1 = 'Luke';
    const password1 = 'skywalker';

    const login2 = 'Obi-Van';
    const password2 = 'kenobi';

    const authorize_luke_skywalker = {
      type: authorizeUserByCredentials.type,
      payload: {
        login: login1,
        password: password1
      }
    };

    expect(
      user(
        [
          {
            login: login1,
            password: password1,
            passwordHash: `test-${password1}`,
            id: `test-${login1}`,
            active: false,
            notifications: true,
            pinCode: null,
            fingerprint: false,
            avatar: null,
            multiAccountSelect: false,
            permissionsToUpdatePassword: false
          },
          {
            login: login2,
            password: password2,
            passwordHash: `test-${password2}`,
            id: `test-${login2}`,
            active: false,
            notifications: true,
            pinCode: null,
            fingerprint: false,
            avatar: null,
            multiAccountSelect: false,
            permissionsToUpdatePassword: false
          }
        ],
        authorize_luke_skywalker
      )
    ).toEqual([
      {
        login: login1,
        password: password1,
        passwordHash: `test-${password1}`,
        id: `test-${login1}`,
        active: true,
        notifications: true,
        pinCode: null,
        fingerprint: false,
        avatar: null,
        multiAccountSelect: false,
        permissionsToUpdatePassword: false
      },
      {
        login: login2,
        password: password2,
        passwordHash: `test-${password2}`,
        id: `test-${login2}`,
        active: false,
        notifications: true,
        pinCode: null,
        fingerprint: false,
        avatar: null,
        multiAccountSelect: false,
        permissionsToUpdatePassword: false
      }
    ]);
  });

  it('should authorize user by PIN-CODE', () => {
    const login = 'Luke';
    const password = 'skywalker';
    const pinCode = '0000';

    const authorize_luke_skywalker_pin = {
      type: authorizeUserByPinCode.type,
      payload: {
        login,
        pinCode
      }
    };

    expect(
      user(
        [
          {
            login,
            password,
            passwordHash: `test-${password}`,
            id: `test-${login}`,
            active: false,
            notifications: true,
            pinCode: '0000',
            fingerprint: false,
            avatar: null,
            multiAccountSelect: false,
            permissionsToUpdatePassword: false
          }
        ],
        authorize_luke_skywalker_pin
      )
    ).toEqual([
      {
        login,
        password,
        passwordHash: `test-${password}`,
        id: `test-${login}`,
        active: true,
        notifications: true,
        pinCode: '0000',
        fingerprint: false,
        avatar: null,
        multiAccountSelect: false,
        permissionsToUpdatePassword: false
      }
    ]);
  });

  it('should authorize user by PIN-CODE with 2 users', () => {
    const login1 = 'Luke';
    const password1 = 'skywalker';
    const pinCode = '0000';

    const login2 = 'Obi-Van';
    const password2 = 'kenobi';

    const authorize_luke_skywalker_pin = {
      type: authorizeUserByPinCode.type,
      payload: {
        login: login1,
        pinCode
      }
    };

    expect(
      user(
        [
          {
            login: login1,
            password: password1,
            passwordHash: `test-${password1}`,
            id: `test-${login1}`,
            active: false,
            notifications: true,
            pinCode: '0000',
            fingerprint: false,
            avatar: null,
            multiAccountSelect: false,
            permissionsToUpdatePassword: false
          },
          {
            login: login2,
            password: password2,
            passwordHash: `test-${password2}`,
            id: `test-${login2}`,
            active: false,
            notifications: true,
            pinCode: '0000',
            fingerprint: false,
            avatar: null,
            multiAccountSelect: false,
            permissionsToUpdatePassword: false
          }
        ],
        authorize_luke_skywalker_pin
      )
    ).toEqual([
      {
        login: login1,
        password: password1,
        passwordHash: `test-${password1}`,
        id: `test-${login1}`,
        active: true,
        notifications: true,
        pinCode: '0000',
        fingerprint: false,
        avatar: null,
        multiAccountSelect: false,
        permissionsToUpdatePassword: false
      },
      {
        login: login2,
        password: password2,
        passwordHash: `test-${password2}`,
        id: `test-${login2}`,
        active: false,
        notifications: true,
        pinCode: '0000',
        fingerprint: false,
        avatar: null,
        multiAccountSelect: false,
        permissionsToUpdatePassword: false
      }
    ]);
  });

  it('should select user between few accounts', () => {
    const id1 = 'test-id';
    const id2 = 'test-id2';

    const select_multi_account_user = {
      type: multiAccountSelect.type,
      payload: {
        userId: id1
      }
    };
    expect(
      user(
        [
          {
            login: 'Luke',
            password: 'skywalker',
            passwordHash: `test-luke`,
            id: id1,
            active: true,
            notifications: true,
            pinCode: '0000',
            fingerprint: true,
            avatar: null,
            multiAccountSelect: false,
            permissionsToUpdatePassword: false
          },
          {
            login: 'Obi-Van',
            password: 'kenobi',
            passwordHash: `test-obi`,
            id: id2,
            active: false,
            notifications: true,
            pinCode: '0000',
            fingerprint: false,
            avatar: null,
            multiAccountSelect: false,
            permissionsToUpdatePassword: false
          }
        ],
        select_multi_account_user
      )
    ).toEqual([
      {
        login: 'Luke',
        password: 'skywalker',
        passwordHash: `test-luke`,
        id: id1,
        active: true,
        notifications: true,
        pinCode: '0000',
        fingerprint: true,
        avatar: null,
        multiAccountSelect: true,
        permissionsToUpdatePassword: false
      },
      {
        login: 'Obi-Van',
        password: 'kenobi',
        passwordHash: `test-obi`,
        id: id2,
        active: false,
        notifications: true,
        pinCode: '0000',
        fingerprint: false,
        avatar: null,
        multiAccountSelect: false,
        permissionsToUpdatePassword: false
      }
    ]);
  });
});

describe('Update user login/password/PIN-CODE', () => {
  it('should update user login', () => {
    const login1 = 'Luke';
    const password1 = 'skywalker';
    const userId1 = 'id1';
    const newLogin = 'new_login';

    const login2 = 'Obi-Van';
    const password2 = 'Kenobi';
    const userId2 = 'id2';

    const update_luke_login = {
      type: updateUserLogin.type,
      payload: {
        userId: userId1,
        login: newLogin,
        password: password1
      }
    };
    expect(
      user(
        [
          {
            login: login1,
            password: password1,
            passwordHash: `test-${password1}`,
            id: userId1,
            active: true,
            notifications: true,
            pinCode: '0000',
            fingerprint: true,
            avatar: null,
            multiAccountSelect: false,
            permissionsToUpdatePassword: false
          },
          {
            login: login2,
            password: password2,
            passwordHash: `test-${password2}`,
            id: userId2,
            active: false,
            notifications: true,
            pinCode: '0000',
            fingerprint: false,
            avatar: null,
            multiAccountSelect: false,
            permissionsToUpdatePassword: false
          }
        ],
        update_luke_login
      )
    ).toEqual([
      {
        login: newLogin,
        password: password1,
        passwordHash: `test-${password1}`,
        id: userId1,
        active: true,
        notifications: true,
        pinCode: '0000',
        fingerprint: true,
        avatar: null,
        multiAccountSelect: false,
        permissionsToUpdatePassword: false
      },
      {
        login: login2,
        password: password2,
        passwordHash: `test-${password2}`,
        id: userId2,
        active: false,
        notifications: true,
        pinCode: '0000',
        fingerprint: false,
        avatar: null,
        multiAccountSelect: false,
        permissionsToUpdatePassword: false
      }
    ]);
  });

  it('should update user password', () => {
    const login1 = 'Luke';
    const password1 = 'skywalker';
    const userId1 = 'id1';
    const newPassword = 'new_password';

    const login2 = 'Obi-Van';
    const password2 = 'Kenobi';
    const userId2 = 'id2';

    const update_luke_password = {
      type: updateUserPassword.type,
      payload: {
        userId: userId1,
        login: login1,
        password: newPassword
      }
    };
    expect(
      user(
        [
          {
            login: login1,
            password: password1,
            passwordHash: `test-${password1}`,
            id: userId1,
            active: true,
            notifications: true,
            pinCode: '0000',
            fingerprint: true,
            avatar: null,
            multiAccountSelect: false,
            permissionsToUpdatePassword: false
          },
          {
            login: login2,
            password: password2,
            passwordHash: `test-${password2}`,
            id: userId2,
            active: false,
            notifications: true,
            pinCode: '0000',
            fingerprint: false,
            avatar: null,
            multiAccountSelect: false,
            permissionsToUpdatePassword: false
          }
        ],
        update_luke_password
      )
    ).toEqual([
      {
        login: login1,
        password: newPassword,
        passwordHash: `test-${password1}`,
        id: userId1,
        active: true,
        notifications: true,
        pinCode: '0000',
        fingerprint: true,
        avatar: null,
        multiAccountSelect: false,
        permissionsToUpdatePassword: false
      },
      {
        login: login2,
        password: password2,
        passwordHash: `test-${password2}`,
        id: userId2,
        active: false,
        notifications: true,
        pinCode: '0000',
        fingerprint: false,
        avatar: null,
        multiAccountSelect: false,
        permissionsToUpdatePassword: false
      }
    ]);
  });

  it('should update user PIN-CODE', () => {
    const login1 = 'Luke';
    const password1 = 'skywalker';
    const userId1 = 'id1';
    const newPinCode = 'new_pinCode';

    const login2 = 'Obi-Van';
    const password2 = 'Kenobi';
    const userId2 = 'id2';

    const update_luke_pinCode = {
      type: updateUserPinCode.type,
      payload: {
        userId: userId1,
        pinCode: newPinCode
      }
    };
    expect(
      user(
        [
          {
            login: login1,
            password: password1,
            passwordHash: `test-${password1}`,
            id: userId1,
            active: true,
            notifications: true,
            pinCode: '0000',
            fingerprint: true,
            avatar: null,
            multiAccountSelect: false,
            permissionsToUpdatePassword: false
          },
          {
            login: login2,
            password: password2,
            passwordHash: `test-${password2}`,
            id: userId2,
            active: false,
            notifications: true,
            pinCode: '0000',
            fingerprint: false,
            avatar: null,
            multiAccountSelect: false,
            permissionsToUpdatePassword: false
          }
        ],
        update_luke_pinCode
      )
    ).toEqual([
      {
        login: login1,
        password: password1,
        passwordHash: `test-${password1}`,
        id: userId1,
        active: true,
        notifications: true,
        pinCode: newPinCode,
        fingerprint: true,
        avatar: null,
        multiAccountSelect: false,
        permissionsToUpdatePassword: false
      },
      {
        login: login2,
        password: password2,
        passwordHash: `test-${password2}`,
        id: userId2,
        active: false,
        notifications: true,
        pinCode: '0000',
        fingerprint: false,
        avatar: null,
        multiAccountSelect: false,
        permissionsToUpdatePassword: false
      }
    ]);
  });
});
