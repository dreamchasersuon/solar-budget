import { createSlice } from 'redux-starter-kit';
import uuid from 'uuid';
import { useDispatch } from 'react-redux';
// eslint-disable-next-line import/no-commonjs
const CryptoJS = require('crypto-js');
const dispatch = useDispatch();

const userSlice = createSlice({
  name: 'user',
  initialState: [],
  reducers: {
    createByCredentials(state, action) {
      const { password, login } = action.payload;

      let isUserExist = false;
      if (state.length) {
        isUserExist = state.find(user => user.login === login);
      }
      if (isUserExist) {
        throw new Error('Пользователь с данным логином уже существует');
      }

      const id = uuid(login);
      const passwordHash = CryptoJS.AES.encrypt(password, login).toString();

      state.forEach(user => (user.active = false));
      state.push({
        id,
        login,
        password,
        passwordHash,
        active: true,
        notifications: true,
        pinCode: null,
        pinHash: null,
        fingerprint: false,
        avatar: null,
        multiAccountSelect: false
      });
    },
    createPinCode(state, action) {
      const { pinCode } = action.payload;
      state.map(user => {
        if (user.pinCode === pinCode) {
          throw new Error('Данный PIN-CODE уже используется');
        }
        if (user.active) {
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
        throw new Error('Пользователь не найден.');
      }
      const decryptedPassword = CryptoJS.AES.decrypt(
        user.passwordHash,
        login
      ).toString(CryptoJS.enc.Utf8);

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
        throw new Error('Пользователь не найден.');
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
          dispatch(updateUserPasswordHash({ login, password: user.password }));
          return (user.login = login);
        }
        return user;
      });
    },
    updateUserPassword(state, action) {
      const { password, userId } = action.payload;
      state.map(user => {
        if (user.id === userId) {
          dispatch(updateUserPasswordHash({ login: user.login, password }));
          return (user.password = password);
        }
        return user;
      });
    },
    updateUserPasswordHash(state, action) {
      const { login, password } = action.payload;
      state.map(user => {
        if (user.login === login) {
          const passwordHash = CryptoJS.AES.encrypt(password, login).toString();
          return (user.passwordHash = passwordHash);
        }
        return user;
      });
    }
  }
});

export const {
  createByCredentials,
  createPinCode,
  authorizeUserByCredentials,
  authorizeUserByPinCode,
  addAvatar,
  enableFingerprint,
  multiAccountSelect,
  fingerprintScanning,
  updateUserPasswordHash,
  updateUserLogin,
  updateUserPassword
} = userSlice.actions;
export default userSlice.reducer;
