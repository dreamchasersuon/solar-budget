import { createSlice } from 'redux-starter-kit';

const targetSlice = createSlice({
  name: 'target',
  initialState: [],
  reducers: {
    addTarget(state, action) {
      state.push(action.payload);
    }
  }
});

export const { addTarget } = targetSlice.actions;
export default targetSlice.reducer;
