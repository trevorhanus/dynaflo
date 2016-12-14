import Dynaflo from '../../src/';
import getTestConfig from '../../src/getTestConfig';

let d;
describe('createTable', () => {

  beforeAll(done => {
    d = new Dynaflo(getTestConfig());
    done();
  });
  
  afterAll(done => {
    return d.deleteTable('CreateTableTest')
      .then(data => {
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('Can create and delete a table', () => {
    const cft = require('../fixtures/testTable.cloudFormationTemplate.json');
    cft.Properties.TableName = 'CreateTableTest';
    return d.createTable(cft)
      .then(tableDescription => {
        expect(tableDescription.TableName).toBe('CreateTableTest');
      })
      .catch(err => {
        throw new Error(err);
      });
  });
});
