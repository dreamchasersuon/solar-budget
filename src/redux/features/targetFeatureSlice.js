import { createSlice } from 'redux-starter-kit';

const targetSlice = createSlice({
  name: 'target',
  initialState: [],
  reducers: {
    addTarget(state, action) {
      state.push(action.payload);
    },
    setTargetActive(state, action) {
      const { id, userId } = action.payload;

      state.forEach(target => {
        if (target.active && target.userId === userId) {
          target.active = false;
        }
        return target;
      });
      state.forEach(target => {
        if (target.id === id) {
          target.active = true;
        }
        return target;
      });
    },
    depositingToTarget(state, action) {
      state.map(target => {
        if (target.id === action.payload.targetId) {
          target.deposit.push(action.payload);
          return (target.depositAmount = `${Number(target.depositAmount) -
            Number(action.payload.amount)}`);
        }
        return target;
      });
    }
  }
});

export const {
  addTarget,
  setTargetActive,
  depositingToTarget
} = targetSlice.actions;
export default targetSlice.reducer;
