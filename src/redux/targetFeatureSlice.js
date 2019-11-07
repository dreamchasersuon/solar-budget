import { createSlice } from 'redux-starter-kit';

const targetSlice = createSlice({
  name: 'target',
  initialState: [],
  reducers: {
    addTarget(state, action) {
      state.push(action.payload);
    },
    setTargetActive(state, action) {
      state.forEach(target => {
        if (target.active) {
          target.active = false;
        }
        return target;
      });
      state.forEach(target => {
        if (target.depositAmount === action.payload.depositAmount) {
          target.active = true;
        }
        return target;
      });
    }
  }
});

export const { addTarget, setTargetActive } = targetSlice.actions;
export default targetSlice.reducer;
