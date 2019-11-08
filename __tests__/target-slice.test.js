import target, {
  addTarget,
  setTargetActive
} from '../src/redux/features/targetFeatureSlice';

describe('addTarget', () => {
  it('should create target with specified name', () => {
    const target = addTarget({
      name: 'Car'
    });

    expect(target.payload).toEqual({
      name: 'Car'
    });
  });

  it('should create target with specified deposit', () => {
    const target = addTarget({
      price: '5000'
    });

    expect(target.payload).toEqual({
      price: '5000'
    });
  });

  it('should create target with specified name and deposit', () => {
    const target = addTarget({
      name: 'Home',
      price: '50000000'
    });

    expect(target.payload).toEqual({ name: 'Home', price: '50000000' });
  });
});

describe('setTargetActive', () => {
  it('should set new active target', () => {
    const target = setTargetActive({
      id: '255'
    });

    expect(target.payload).toEqual({ id: '255' });
  });
});

describe('targetReducer', () => {
  it('should save target', () => {
    expect(
      target([], {
        type: addTarget.type,
        payload: {
          name: 'Home',
          price: '5000000'
        }
      })
    ).toEqual([
      {
        name: 'Home',
        price: '5000000'
      }
    ]);
  });

  it('should set new active target on click', () => {
    expect(
      target(
        [
          { id: '8735', currency: 'rub', active: true, price: '302' },
          { id: '5435', currency: 'rub', active: false, price: '392' }
        ],
        {
          type: setTargetActive.type,
          payload: {
            id: '5435'
          }
        }
      )
    ).toEqual([
      { id: '8735', currency: 'rub', active: false, price: '302' },
      { id: '5435', currency: 'rub', active: true, price: '392' }
    ]);
  });
});
