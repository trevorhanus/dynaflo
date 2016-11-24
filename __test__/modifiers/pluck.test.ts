import dn from '../../src/dynanode';

xdescribe('Pluck', () => {

  beforeEach(done => {
    const testDoc = {
      id: '1234',
      'my.scalar.key': 14,
      myArray: ['item1', 'item2'],
      key1: {
        key2: 'derp'
      },
      top1: {
        nested1: {
          nested2: {
            nested3: 'way deep'
          }
        },
        nested12: 'airplane'
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

  it('Calling twice', () => {
    expect(() => {
      return dn.table('Test')
        .get({id: '1234'})
        .pluck('my.scalar.key')
        .pluck('myArray')
        .run()
    }).toThrow();
  });

  it('Nested object', () => {
    return dn.table('Test')
      .get({id: '1234'})
      .pluck({
        key1: {key2: true}
      })
      .run()
      .then(data => {
        expect(data.Item['my.scalar.key']).toBe(undefined);
        expect(data.Item.key1.key2).toBe('derp');
      });
  });

  it('Deeply nested object', () => {
    return dn.table('Test')
      .get({id: '1234'})
      .pluck({
        top1: {nested1: {nested2: { nested3: true}}}
      })
      .run()
      .then(data => {
        expect(data.Item.top1.nested1.nested2.nested3).toBe('way deep');
        expect(data.Item.top1.nested12).toBe(undefined);
      });
  });

  it('Top level attribute and a nested object', () => {
    return dn.table('Test')
      .get({id: '1234'})
      .pluck('my.scalar.key', {
        top1: {nested1: {nested2: { nested3: true}}}
      })
      .run()
      .then(data => {
        expect(data.Item.top1.nested1.nested2.nested3).toBe('way deep');
        expect(data.Item['my.scalar.key']).toBe(14);
      });
  });

  xit('Deeply nested object using shorthand', () => {
    return dn.table('Test')
      .get({id: '1234'})
      .pluck({
        top1: ['nested1', 'nested12']
      })
      .run()
      .then(data => {
        expect(data.Item.top1.nested1.nested2.nested3).toBe('way deep');
        expect(data.Item.top1.nested12).toBe('airplane');
        expect(data.Item['my.scalar.key']).toBe(undefined);
      });
  });

  it('Works with an attribute that does not exist', () => {
    return dn.table('Test')
      .get({id: '1234'})
      .pluck('my.scalar.key', 'does_not_exist')
      .run()
      .then(data => {
        expect(data.Item['my.scalar.key']).toBe(14);
      });
  });

  it('Works with a non-existent nested attribute', () => {
    return dn.table('Test')
      .get({id: '1234'})
      .pluck('my.scalar.key', {does_not_exist: true})
      .run()
      .then(data => {
        expect(data.Item['my.scalar.key']).toBe(14);
      });
  });
});
