import target, { addTarget } from '../src/redux/targetFeatureSlice';

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
      deposit: '5000'
    });

    expect(target.payload).toEqual({
      deposit: '5000'
    });
  });

  it('should create target with specified name and deposit', () => {
    const target = addTarget({
      name: 'Home',
      deposit: '50000000'
    });

    expect(target.payload).toEqual({ name: 'Home', deposit: '50000000' });
  });
});

describe('targetReducer', () => {
  it('should save target', () => {
    expect(
      target([], {
        type: addTarget.type,
        payload: {
          name: 'Home',
          deposit: '5000000'
        }
      })
    ).toEqual([
      {
        name: 'Home',
        deposit: '5000000'
      }
    ]);
  });
});
