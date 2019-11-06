import { createSlice } from 'redux-starter-kit';

const walletSlice = createSlice({
  name: 'wallet',
  initialState: [],
  reducers: {
    addTransaction(state, action) {
      console.log(action.payload);
      state.push(action.payload);
    }
  }
});

export const { addTransaction } = walletSlice.actions;
export default walletSlice.reducer;
