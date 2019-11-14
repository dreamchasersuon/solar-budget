import { createSlice } from 'redux-starter-kit';

const rateSlice = createSlice({
  name: 'rate',
  initialState: [],
  reducers: {
    addRate(state, action) {
      state.push(action.payload);
    },
    removeRate(state, action) {
      const { pair, userId } = action.payload;
      state.pop(rate => rate.pair === pair && rate.userId === userId);
    }
  }
});

export const { addRate, removeRate } = rateSlice.actions;
export default rateSlice.reducer;
