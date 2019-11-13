import { createSlice } from 'redux-starter-kit';
import uuid from 'uuid';
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
      const passwordHash = CryptoJS.enc.Hex.parse(password);

      state.push({
        id,
        login,
        password,
        passwordHash,
        active: true,
        notifications: true,
        pinCode: null,
        fingerprint: null,
        avatar: null
      });
    },
    createPinCode(state, action) {
      state.map(user => {
        if (user.active) {
          return (user.pinCode = action.payload.pinCode);
        }
        return user;
      });
    }
  }
});

export const { createByCredentials, createPinCode } = userSlice.actions;
export default userSlice.reducer;
