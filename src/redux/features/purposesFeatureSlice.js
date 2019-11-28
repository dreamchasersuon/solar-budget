import { createSlice } from 'redux-starter-kit';
import {
  $AQUAMARINE,
  $AZURE_RADIANCE,
  $BITTERSWEET,
  $BRANDY_PUNCH,
  $CANARY,
  $CRUSTA,
  $ELECTRIC_VIOLET,
  $GREEN_YELLOW,
  $ORCHID,
  $RED,
  $RIPE_LEMON,
  $SHAMROCK
} from '../../constants/colorLiterals';

const predefinedPurposes = {
  products: { en: 'Products', ru: 'Продукты', color: $SHAMROCK },
  transfer: {
    en: 'Money transfer',
    ru: 'Денежный перевод',
    color: $RIPE_LEMON
  },
  furniture: { en: 'Furniture', ru: 'Мебель', color: $BRANDY_PUNCH },
  medicine: { en: 'Health', ru: 'Здоровье', color: $AZURE_RADIANCE },
  taxes: { en: 'Taxes', ru: 'Налоги', color: $BITTERSWEET },
  credit: { en: 'Credit', ru: 'Кредит', color: $RED },
  communal: {
    en: 'Communal payments',
    ru: 'Коммунальные платежи',
    color: $AQUAMARINE
  },
  transport: {
    en: 'Fare',
    ru: 'Транспортные расходы',
    color: $ELECTRIC_VIOLET
  },
  clothes: { en: 'Clothes', ru: 'Одежда', color: $ORCHID },
  household: {
    en: 'Household expenses',
    ru: 'Бытовые расходы',
    color: $CANARY
  },
  pets: { en: 'Pet expenses', ru: 'Домашнее животное', color: $CRUSTA },
  salary: { en: 'Salary', ru: 'Зарплата', color: $GREEN_YELLOW }
};
const purposesSlice = createSlice({
  name: 'purposes',
  initialState: {
    ...predefinedPurposes,
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
