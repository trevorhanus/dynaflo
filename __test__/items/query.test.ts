import Dynanode from '../../src/dynanode';

let dn;
xdescribe('Get', () => {
  
  beforeAll(done => {
    dn = new Dynanode({
      region: 'us-west-2',
      endpoint: 'http://localhost:7777'
    });
    done();
  });

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

  it('Can query a table with partition key', () => {
    return dn.table('Test')
      .query({id: '1234'})
      .run()
      .then(data => {
        expect(data.Item['my.scalar.key']).toBe(14);
        expect(data.Item.key1.key2).toBe('derp');
      })
      .catch(err => {
        throw new Error(err);
      });
  });

  it('Can query a table with key condition', () => {
    return dn.table('Test')
      .query(attr('id').eq('1234'))
      .run()
      .then(data => {
        expect(data.Item['my.scalar.key']).toBe(14);
        expect(data.Item.key1.key2).toBe('derp');
      })
      .catch(err => {
        throw new Error(err);
      });
  });
});
