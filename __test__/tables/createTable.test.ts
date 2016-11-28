import Dynanode from '../../src/dynanode';
import getTestConfig from '../../src/getTestConfig';

let dn;
describe('createTable', () => {

  beforeAll(done => {
    dn = new Dynanode(getTestConfig());
    done();
  });
  
  afterAll(done => {
    return dn.deleteTable('CreateTableTest')
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
    return dn.createTable(cft)
      .then(tableDescription => {
        expect(tableDescription.TableName).toBe('CreateTableTest');
      })
      .catch(err => {
        throw new Error(err);
      });
  });
});
