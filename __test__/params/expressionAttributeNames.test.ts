import {ExpressionAttributeNames} from '../../src/params';

describe('ExpressionAttributeNames', () => {

  it('Can add a key value pair', () => {
    const map = new ExpressionAttributeNames();
    map.add('#safe-hash', 'name');
    expect(map.toJS()['#safe-hash']).toBe('name');
    expect(Object.keys(map.toJS()).length).toBe(1);
  });

  it('Errors when trying to add same hash', () => {
    const map = new ExpressionAttributeNames();
    map.add('#safe-hash', 'name');
    expect(() => {
      map.add('#safe-hash', 'other-name');
    }).toThrow();
  });
});
