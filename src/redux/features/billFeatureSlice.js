import { createSlice } from 'redux-starter-kit';

const billSlice = createSlice({
  name: 'bill',
  initialState: [],
  reducers: {
    addBill(state, action) {
      state.push(action.payload);
    },
    withdrawDepositing(state, action) {
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
      const { id, userId } = action.payload;
      state.forEach(bill => {
        if (bill.active && bill.userId === userId) {
          bill.active = false;
        }
        return bill;
      });
      state.forEach(bill => {
        if (bill.id === id) {
          bill.active = true;
        }
        return bill;
      });
    }
  }
});

export const { addBill, setBillActive, withdrawDepositing } = billSlice.actions;
export default billSlice.reducer;
