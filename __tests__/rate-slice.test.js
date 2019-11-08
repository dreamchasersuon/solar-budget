import rate, {
  addRate,
  removeRate
} from '../src/redux/features/rateFeatureSlice';

describe('addRate', () => {
  it('should create target with specified name', () => {
    const rate = addRate({
      pair: 'USD/CAN',
      selected: true
    });

    expect(rate.payload).toEqual({
      pair: 'USD/CAN',
      selected: true
    });
  });
});

describe('removeRate', () => {
  it('should remove rate by pair name', () => {
    const rate = removeRate('USD/CAN');

    expect(rate.payload).toEqual('USD/CAN');
  });
});

describe('rateReducer', () => {
  it('should save rate', () => {
    expect(
      rate([], {
        type: addRate.type,
        payload: {
          pair: 'USD/CAN',
          selected: false
        }
      })
    ).toEqual([
      {
        pair: 'USD/CAN',
        selected: false
      }
    ]);
  });

  it('should remove rate', () => {
    expect(
      rate(
        [
          {
            pair: 'USD/CAN',
            selected: false
          }
        ],
        {
          type: removeRate.type,
          payload: { pair: 'USD/CAN' }
        }
      )
    ).toEqual([]);
  });
});
