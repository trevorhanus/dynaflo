import dn from '../../src/dynanode';

describe('Pluck', () => {

  beforeEach(done => {
    const testDoc = {
      id: '1234',
      'my.scalar.key': 14,
      myArray: ['item1', 'item2'],
      key1: {
        key2: 'derp'
      }
    };
    const cft = require('../fixtures/testTable.cloudFormationTemplate.json')
    return dn.createTable(cft)
      .then(data => {
        return dn.table('Test')
          .put(testDoc)
          .run();
      })
      .then(data => {
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  afterEach(done => {
    return dn.deleteTable('Test')
      .then(data => {
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('Can get an Item and pluck only a scalar attribute', () => {
    return dn.table('Test')
      .get({id: '1234'})
      .pluck('my.scalar.key')
      .run()
      .then(data => {
        expect(data.Item['my.scalar.key']).toBe(14);
        expect(data.Item.key1).toBe(undefined);
      })
      .catch(err => {
        throw new Error(err);
      });
  });

  it('Can pluck an array', () => {
    return dn.table('Test')
      .get({id: '1234'})
      .pluck('myArray')
      .run()
      .then(data => {
        expect(data.Item['my.scalar.key']).toBe(undefined);
        expect(data.Item.key1).toBe(undefined);
        expect(data.Item.myArray[1]).toBe('item2');
      })
      .catch(err => {
        throw new Error(err);
      });
  });

  it('Throws when nothing is passed to pluck', () => {
    expect(() => {
      dn.table('Test')
        .get({id: '1234'})
        .pluck()
        .run()
    }).toThrow();
  });

  it('Works when pluck is called twice', () => {
    return dn.table('Test')
      .get({id: '1234'})
      .pluck('my.scalar.key')
      .pluck('myArray')
      .run()
      .then(data => {
        expect(data.Item[my.scalar.key]).toBe(14);
        expect(data.Item.myArray.length).toBe(2);
      });
  });
});
