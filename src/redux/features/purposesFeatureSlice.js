import { createSlice } from 'redux-starter-kit';

const purposesSlice = createSlice({
  name: 'purposes',
  initialState: {
    products: { en: 'Products', ru: 'Продукты' },
    transfer: { en: 'Money transfer', ru: 'Денежный перевод' },
    furniture: { en: 'Furniture', ru: 'Мебель' },
    medicine: { en: 'Medicine', ru: 'Лекарства' },
    taxes: { en: 'Taxes', ru: 'Налоги' },
    credit: { en: 'Credit', ru: 'Кредит' },
    communal: { en: 'Communal payments', ru: 'Коммунальные платежи' },
    transport: { en: 'Fare', ru: 'Транспортные расходы' },
    clothes: { en: 'Clothes', ru: 'Одежда' },
    household: { en: 'Household expenses', ru: 'Бытовые расходы' },
    pets: { en: 'Pet expenses', ru: 'Домашнее животное' },
    salary: { en: 'Salary', ru: 'Зарплата' },
    userPurposes: []
  },
  reducers: {
    addPurpose(state, action) {
      const { userId, purpose } = action.payload;
      const user = state.userPurposes.find(
        userPurpose => userPurpose.userId === userId
      );
      if (!user) {
        return state.userPurposes.push({ userId, purposes: [purpose] });
      }
      user.purposes.push(purpose);
    }
  }
});

export const { addPurpose } = purposesSlice.actions;
export default purposesSlice.reducer;
