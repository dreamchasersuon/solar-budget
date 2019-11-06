import { createSlice } from 'redux-starter-kit';

const userSlice = createSlice({
  name: 'user',
  initialState: [],
  reducers: {
    addUser(state, action) {
      state.push(action.payload);
    }
  }
});

const walletSlice = createSlice({
  name: 'wallet',
  initialState: [],
  reducers: {
    addTransaction(state, action) {
      state.push(action.payload);
    }
  }
});

const targetSlice = createSlice({
  name: 'target',
  initialState: [],
  reducers: {
    addTarget(state, action) {
      state.push(action.payload);
    }
  }
});

const rateSlice = createSlice({
  name: 'rate',
  initialState: [],
  reducers: {
    addRate(state, action) {
      state.push(action.payload);
    }
  }
});

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {},
  reducers: {}
});

export const { addUser } = userSlice.actions;
export const { addTransaction } = walletSlice.actions;
export const { addTarget } = targetSlice.actions;
export const { addRate } = rateSlice.actions;

const { user } = userSlice.reducer;
const { wallet } = walletSlice.reducer;
const { target } = targetSlice.reducer;
const { rate } = rateSlice.reducer;
const { settings } = settingsSlice.reducer;

export default {
  user,
  wallet,
  target,
  rate,
  settings
};
