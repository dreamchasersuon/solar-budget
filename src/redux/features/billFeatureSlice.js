import { createSlice } from 'redux-starter-kit';

const billSlice = createSlice({
  name: 'bill',
  initialState: [],
  reducers: {
    addBill(state, action) {
      state.push(action.payload);
    },
    withdrawDepositing(state, action) {
      console.log(action);
      state.map(bill => {
        if (bill.id === action.payload.billId) {
          if (action.payload.type === 'income') {
            return (bill.depositAmount = `${Number(bill.depositAmount) +
              Number(action.payload.amount)}`);
          }
          return (bill.depositAmount = `${Number(bill.depositAmount) -
            Number(action.payload.amount)}`);
        }
        return bill;
      });
    },
    setBillActive(state, action) {
      state.forEach(bill => {
        if (bill.active) {
          bill.active = false;
        }
        return bill;
      });
      state.forEach(bill => {
        if (bill.id === action.payload.id) {
          bill.active = true;
        }
        return bill;
      });
    }
  }
});

export const { addBill, setBillActive, withdrawDepositing } = billSlice.actions;
export default billSlice.reducer;
