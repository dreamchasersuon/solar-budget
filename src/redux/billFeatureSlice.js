import { createSlice } from 'redux-starter-kit';

const billSlice = createSlice({
  name: 'bill',
  initialState: [],
  reducers: {
    addBill(state, action) {
      state.push(action.payload);
    },
    setBillActive(state, action) {
      state.forEach(bill => {
        if (bill.active) {
          bill.active = false;
        }
        return bill;
      });
      state.forEach(bill => {
        if (bill.depositAmount === action.payload.depositAmount) {
          bill.active = true;
        }
        return bill;
      });
    }
  }
});

export const { addBill, setBillActive } = billSlice.actions;
export default billSlice.reducer;
