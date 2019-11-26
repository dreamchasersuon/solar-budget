import { createSlice } from 'redux-starter-kit';
import uuid from 'uuid';
// eslint-disable-next-line import/no-commonjs
const CryptoJS = require('crypto-js');
const env = process.env.NODE_ENV;

const userSlice = createSlice({
  name: 'user',
  initialState: [
    {
      id: '777',
      login: 'admin',
      password: 'admin',
      passwordHash: 'admin',
      pinCode: '0000',
      active: true,
      notifications: true,
      fingerprint: true,
      avatar: null,
      locale: 'en',
      multiAccountSelect: false,
      permissionsToUpdatePassword: false
    }
  ],
  reducers: {
    createUser(state, action) {
      const { password, login } = action.payload;

      let isUserExist = false;
      if (state.length) {
        isUserExist = state.find(user => user.login === login);
      }
      if (isUserExist) {
        // TODO: extract translation
        const activeUser = state.find(user => user.active);
        const activeUserLocale = activeUser.locale;
        let errorMsg;
        switch (activeUserLocale) {
          case 'en':
            errorMsg = 'User with this login already exists';
            break;
          case 'ru':
            errorMsg = 'Пользователь с данным логином уже существует';
            break;
          default:
            errorMsg = 'Пользователь с данным логином уже существует';
        }
        throw new Error(errorMsg);
      }

      const id = env === 'test' ? `test-${login}` : uuid(login);

      const passwordHash =
        env === 'test'
          ? `test-${password}`
          : CryptoJS.AES.encrypt(password, login).toString();

      state.forEach(user => (user.active = false));
      state.push({
        id,
        login,
        password,
        passwordHash,
        pinCode: null,
        active: true,
        notifications: true,
        fingerprint: false,
        avatar: null,
        locale: 'en',
        multiAccountSelect: false,
        permissionsToUpdatePassword: false
      });
    },
    createPinCode(state, action) {
      const { pinCode, login } = action.payload;
      state.map(user => {
        if (user.login === login) {
          return (user.pinCode = pinCode);
        }
        return user;
      });
    },
    // TODO: extract encryption
    authorizeUserByCredentials(state, action) {
      const { login, password } = action.payload;
      const user = state.find(user => user.login === login);

      if (!user) {
        // TODO: extract translation
        const activeUser = state.find(user => user.active);
        const activeUserLocale = activeUser.locale;
        let errorMsg;
        switch (activeUserLocale) {
          case 'en':
            errorMsg = 'User not found';
            break;
          case 'ru':
            errorMsg = 'Пользователь не найден';
            break;
          default:
            errorMsg = 'User not found';
        }
        throw new Error(errorMsg);
      }
      const decryptedPassword =
        env === 'test'
          ? password
          : CryptoJS.AES.decrypt(user.passwordHash, login).toString(
              CryptoJS.enc.Utf8
            );

      if (decryptedPassword === password) {
        state.map(user => {
          if (user.active) {
            user.active = false;
          }
          if (user.login === login) {
            return (user.active = true);
          }
          return user;
        });
      }
    },
    authorizeUserByPinCode(state, action) {
      const { pinCode, login } = action.payload;
      const user = state.find(
        user => user.login === login && user.pinCode === pinCode
      );
      if (!user) {
        // TODO: extract translation
        const activeUser = state.find(user => user);
        const activeUserLocale = activeUser.locale;
        let errorMsg;
        switch (activeUserLocale) {
          case 'en':
            errorMsg = 'User not found';
            break;
          case 'ru':
            errorMsg = 'Пользователь не найден';
            break;
          default:
            errorMsg = 'User not found';
        }
        throw new Error(errorMsg);
      }

      state.map(user => {
        if (user.active) {
          user.active = false;
        }
        if (user.login === login) {
          return (user.active = true);
        }
        return user;
      });
    },
    addAvatar(state, action) {
      const { uri, userId } = action.payload;
      state.map(user => {
        if (user.id === userId) {
          user.avatar = uri;
        }
        return user;
      });
    },
    enableFingerprint(state, action) {
      const { userId } = action.payload;
      state.map(user => {
        if (user.id === userId) {
          user.fingerprint = true;
        }
        return user;
      });
    },
    fingerprintScanning(state, action) {
      const { login } = action.payload;
      state.map(user => {
        if (user.active) {
          user.active = false;
        }
        if (user.login === login) {
          user.active = true;
        }
        return user;
      });
    },
    multiAccountSelect(state, action) {
      const { userId } = action.payload;
      state.map(user => {
        if (user.multiAccountSelect) {
          user.multiAccountSelect = false;
        }
        if (user.id === userId) {
          return (user.multiAccountSelect = true);
        }
        return user;
      });
    },
    updateUserLogin(state, action) {
      const { login, userId } = action.payload;
      state.map(user => {
        if (user.id === userId) {
          return (user.login = login);
        }
        return user;
      });
    },
    updateUserPassword(state, action) {
      const { password, userId } = action.payload;
      state.map(user => {
        if (user.id === userId) {
          return (user.password = password);
        }
        return user;
      });
    },
    updateUserPasswordHash(state, action) {
      const { login, password } = action.payload;
      state.map(user => {
        if (user.login === login) {
          const passwordHash =
            env === test
              ? `test-${password}`
              : CryptoJS.AES.encrypt(password, login).toString();
          return (user.passwordHash = passwordHash);
        }
        return user;
      });
    },
    validateUserPassword(state, action) {
      const { password, userId } = action.payload;
      const isValidPassword = state.find(
        user => user.id === userId && user.password === password
      );
      if (!isValidPassword) {
        // TODO: extract translation
        const activeUser = state.find(user => user);
        const activeUserLocale = activeUser.locale;
        let errorMsg;
        switch (activeUserLocale) {
          case 'en':
            errorMsg = 'Wrong password';
            break;
          case 'ru':
            errorMsg = 'Неверный пароль';
            break;
          default:
            errorMsg = 'Wrong password';
        }
        throw new Error(errorMsg);
      }
      state.map(user => {
        if (user.id === userId) {
          if (user.password === password) {
            return (user.permissionsToUpdatePassword = true);
          }
          return user;
        }
        return user;
      });
    },
    setPasswordUpdatePermissionsDenied(state, action) {
      const { login } = action.payload;
      state.map(user => {
        if (user.login === login) {
          return (user.permissionsToUpdatePassword = false);
        }
        return user;
      });
    },
    validatePinCode(state, action) {
      const { pinCode, userId } = action.payload;
      const user = state.find(user => {
        return user.id === userId && user.pinCode === pinCode;
      });
      if (user) {
        return state;
      }

      // TODO: extract translation
      const activeUser = state.find(user => user);
      const activeUserLocale = activeUser.locale;
      let errorMsg;
      switch (activeUserLocale) {
        case 'en':
          errorMsg = 'Wrong PIN-CODE';
          break;
        case 'ru':
          errorMsg = 'Неверный PIN-CODE';
          break;
        default:
          errorMsg = 'Wrong PIN-CODE';
      }
      throw new Error(errorMsg);
    },
    updateUserPinCode(state, action) {
      const { pinCode, userId } = action.payload;
      state.map(user => {
        if (user.id === userId) {
          return (user.pinCode = pinCode);
        }
        return user;
      });
    },
    setLocale(state, action) {
      const { locale, userId } = action.payload;
      state.map(user => {
        if (user.id === userId) {
          return (user.locale = locale);
        }
        return user;
      });
    }
  }
});

export const updateUserLoginThunk = ({
  password,
  login,
  userId
}) => dispatch => {
  dispatch(updateUserLogin({ login, userId }));
  dispatch(updateUserPasswordHash({ login, password }));
};

export const updateUserPasswordThunk = ({
  login,
  password,
  userId
}) => dispatch => {
  dispatch(updateUserPassword({ password, userId }));
  dispatch(updateUserPasswordHash({ login, password }));
};

export const {
  createUser,
  createPinCode,
  authorizeUserByCredentials,
  authorizeUserByPinCode,
  addAvatar,
  enableFingerprint,
  multiAccountSelect,
  fingerprintScanning,
  updateUserLogin,
  updateUserPassword,
  updateUserPasswordHash,
  validateUserPassword,
  updateUserPinCode,
  validatePinCode,
  setPasswordUpdatePermissionsDenied,
  setLocale
} = userSlice.actions;
export default userSlice.reducer;
