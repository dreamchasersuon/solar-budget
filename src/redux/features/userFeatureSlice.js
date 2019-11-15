import { createSlice } from 'redux-starter-kit';
import uuid from 'uuid';
import NavigationService from '../../navigation/service';
// eslint-disable-next-line import/no-commonjs
const CryptoJS = require('crypto-js');

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
          const pinHash = CryptoJS.AES.encrypt(pinCode, user.login).toString();
          user.pinCode = pinCode;
          return (user.pinHash = pinHash);
        }
        return user;
      });
    },
    authorizeUserByCredentials(state, action) {
      const { login, password } = action.payload;
      const user = state.find(user => user.login === login);

      if (!user) {
        throw new Error('Пользователя с данным логином не существует.');
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
      const { pinCode } = action.payload;
      const { user } = state;
      const multiAccountSelectedUser = user.find(
        user => user.multiAccountSelect
      );
      const userPinHash = multiAccountSelectedUser
        ? multiAccountSelectedUser.pinHash
        : user[0].pinHash;
      const userLogin = multiAccountSelectedUser
        ? multiAccountSelectedUser.login
        : user[0].login;

      const decryptedPin = CryptoJS.AES.decrypt(
        userPinHash,
        userLogin
      ).toString(CryptoJS.enc.Utf8);

      if (decryptedPin === pinCode) {
        state.map(user => {
          if (user.active) {
            user.active = false;
          }
          if (user.login === user[0].login) {
            return (user.active = true);
          }
          return user;
        });
      }

      state.forEach(user => (user.active = false));
      user.active = true;
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
      const { userLogin } = action.payload;
      state.map(user => {
        if (user.active) {
          user.active = false;
        }
        if (user.login === userLogin) {
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
          user.multiAccountSelect = true;
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
  fingerprintScanning
} = userSlice.actions;
export default userSlice.reducer;
