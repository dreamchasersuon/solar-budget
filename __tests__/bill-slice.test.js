import bill, { addBill } from '../src/redux/billFeatureSlice';

describe('addBill', () => {
  it('should create target with specified name', () => {
    const bill = addBill({
      name: 'USD'
    });

    expect(bill.payload).toEqual({
      name: 'USD'
    });
  });

  it('should create target with specified deposit', () => {
    const bill = addBill({
      deposit: '5000'
    });

    expect(bill.payload).toEqual({
      deposit: '5000'
    });
  });

  it('should create target with specified name and deposit', () => {
    const bill = addBill({
      name: 'Rubles',
      deposit: '50000000'
    });

    expect(bill.payload).toEqual({ name: 'Rubles', deposit: '50000000' });
  });
});

describe('billReducer', () => {
  it('should save bill', () => {
    expect(
      bill([], {
        type: addBill.type,
        payload: {
          name: 'Rubles',
          deposit: '4000000'
        }
      })
    ).toEqual([
      {
        name: 'Rubles',
        deposit: '4000000'
      }
    ]);
  });
});
