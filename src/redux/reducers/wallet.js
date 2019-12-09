// eslint-disable-next-line import/no-namespace
import * as types from "../types";

export const wallet = [];

export default function walletReducer(state = wallet, action) {
  switch (action.type) {
    case types.WALLET_INCREMENT_PAYMENT:
      return [...state, action.payload];

    default:
      return state;
  }
}
