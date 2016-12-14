import Dynaflo from '../../src/';
import getTestConfig from '../../src/getTestConfig';

let d;
describe('Get', () => {

  beforeAll(done => {
    d = new Dynaflo(getTestConfig());
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
    cft.Properties.TableName = 'GetTest';
    return d.createTable(cft)
      .then(data => {
        return d.table('GetTest')
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
    return d.deleteTable('GetTest')
      .then(data => {
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('Can get an Item', () => {
    return d.table('GetTest')
      .get({id: '1234'})
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
