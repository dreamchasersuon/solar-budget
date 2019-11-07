import wallet, { addTransaction } from '../src/redux/walletFeatureSlice';

describe('addTransaction', () => {
  it('should generate debit transaction', () => {
    const transactionDebit = addTransaction({
      amount: '100',
      type: 'income'
    });

    expect(transactionDebit.payload).toEqual({
      amount: '100',
      type: 'income'
    });
  });

  it('should generate credit transaction', () => {
    const transactionCredit = addTransaction({
      amount: '100',
      type: 'outcome'
    });

    expect(transactionCredit.payload).toEqual({
      amount: '100',
      type: 'outcome'
    });
  });

  it('should generate transaction with specified description', () => {
    const transaction = addTransaction({
      description: 'Transfer from Kate'
    });

    expect(transaction.payload).toEqual({ description: 'Transfer from Kate' });
  });
});

describe('walletReducer', () => {
  it('should save transaction', () => {
    expect(
      wallet([], {
        type: addTransaction.type,
        payload: {
          amount: '100',
          type: 'income'
        }
      })
    ).toEqual([
      {
        amount: '100',
        type: 'income'
      }
    ]);
  });
});
