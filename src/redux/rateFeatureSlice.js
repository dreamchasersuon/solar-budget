import { createSlice } from 'redux-starter-kit';

const rateSlice = createSlice({
  name: 'rate',
  initialState: [],
  reducers: {
    addRate(state, action) {
      state.push(action.payload);
    }
  }
});

export const { addRate } = rateSlice.actions;
export default rateSlice.reducer;
