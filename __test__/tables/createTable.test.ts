import Fluent from '../../src/fluent';
import getTestConfig from '../../src/getTestConfig';

let f;
describe('createTable', () => {

  beforeAll(done => {
    f = new Fluent(getTestConfig());
    done();
  });
  
  afterAll(done => {
    return f.deleteTable('CreateTableTest')
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
    return f.createTable(cft)
      .then(tableDescription => {
        expect(tableDescription.TableName).toBe('CreateTableTest');
      })
      .catch(err => {
        throw new Error(err);
      });
  });
});
