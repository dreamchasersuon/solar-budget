import * as types from "../../types";

export default function incrementPayment(value) {
  return {
    type: types.WALLET_INCREMENT_PAYMENT,
    payload: value
  };
}
