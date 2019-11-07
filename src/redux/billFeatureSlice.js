import { createSlice } from 'redux-starter-kit';

const billSlice = createSlice({
  name: 'bill',
  initialState: [],
  reducers: {
    addBill(state, action) {
      state.push(action.payload);
    },
    setBillActive(state, action) {
      state.find(bill => {
        if (bill.active === true) {
          bill.active = false;
        }
        if (bill.depositAmount === action.payload.depositAmount) {
          return (bill.active = true);
        }
        return bill;
      });
    }
  }
});

export const { addBill } = billSlice.actions;
export default billSlice.reducer;
