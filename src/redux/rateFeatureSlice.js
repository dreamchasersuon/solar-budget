import { createSlice } from 'redux-starter-kit';

const rateSlice = createSlice({
  name: 'rate',
  initialState: [],
  reducers: {
    addRate(state, action) {
      state.push(action.payload);
    },
    removeRate(state, action) {
      return state.filter(rate => rate.pair !== action.payload.pair);
    }
  }
});

export const { addRate, removeRate } = rateSlice.actions;
export default rateSlice.reducer;
