import bill, {
  addBill,
  setBillActive
} from '../src/redux/features/billFeatureSlice';

describe('addBill', () => {
  it('should create target with specified name', () => {
    const bill = addBill({
      currency: 'usd'
    });

    expect(bill.payload).toEqual({
      currency: 'usd'
    });
  });

  it('should create target with specified deposit', () => {
    const bill = addBill({
      depositAmount: '5000'
    });

    expect(bill.payload).toEqual({
      depositAmount: '5000'
    });
  });

  it('should create target with specified name and deposit', () => {
    const bill = addBill({
      currency: 'rub',
      depositAmount: '50000000'
    });

    expect(bill.payload).toEqual({
      currency: 'rub',
      depositAmount: '50000000'
    });
  });
});

describe('setBillActive', () => {
  it('should set new active bill', () => {
    const bill = setBillActive({
      id: '255'
    });

    expect(bill.payload).toEqual({ id: '255' });
  });
});

describe('billReducer', () => {
  it('should save bill', () => {
    expect(
      bill([], {
        type: addBill.type,
        payload: {
          id: '1',
          name: 'rub',
          userId: 'user-1',
          currency: 'rub',
          depositAmount: '200',
          active: true
        }
      })
    ).toEqual([
      {
        id: '1',
        name: 'rub',
        userId: 'user-1',
        currency: 'rub',
        depositAmount: '200',
        active: true
      }
    ]);
  });

  it('should set new active bill on click', () => {
    expect(
      bill(
        [
          { id: '1245', currency: 'rub', active: true, depositAmount: '302' },
          { id: '8735', currency: 'rub', active: false, depositAmount: '392' }
        ],
        {
          type: setBillActive.type,
          payload: {
            id: '8735'
          }
        }
      )
    ).toEqual([
      { id: '1245', currency: 'rub', active: false, depositAmount: '302' },
      { id: '8735', currency: 'rub', active: true, depositAmount: '392' }
    ]);
  });
});
