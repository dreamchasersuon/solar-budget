import user, {
  createByCredentials,
  createPinCode,
  authorizeUserByCredentials,
  authorizeUserByPinCode,
  multiAccountSelect
} from '../src/redux/features/userFeatureSlice';

describe('Create users', () => {
  it('should create new user', () => {
    const login1 = 'Luke';
    const password1 = 'skywalker';

    const luke_skywalker = {
      type: createByCredentials.type,
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
      type: createByCredentials.type,
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
