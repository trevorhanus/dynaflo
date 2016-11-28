import Dynanode from '../../src/dynanode';
import getTestConfig from '../../src/getTestConfig';

let dn;
describe('describeTable', () => {

  beforeAll(done => {
    dn = new Dynanode(getTestConfig());
    const cft = require('../fixtures/testTable.cloudFormationTemplate.json');
    cft.Properties.TableName = 'DescribeTableTest';
    return dn.createTable(cft)
      .then(data => {
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  afterAll(done => {
    return dn.deleteTable('DescribeTableTest')
      .then(data => {
        done();
      })
      .catch(err => {
        done(err);
      });
  });
  
  it('Can describe a table', () => {
    return dn.describeTable('DescribeTableTest')
      .then(table => {
        expect(table.TableName).toBe('DescribeTableTest');
        expect(table.AttributeDefinitions.length).toBe(1);
      })
      .catch(err => {
        throw new Error(err);
      });
  });
});
