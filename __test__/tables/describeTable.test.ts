import Fluent from '../../src/fluent';
import getTestConfig from '../../src/getTestConfig';

let f;
describe('describeTable', () => {

  beforeAll(done => {
    f = new Fluent(getTestConfig());
    const cft = require('../fixtures/testTable.cloudFormationTemplate.json');
    cft.Properties.TableName = 'DescribeTableTest';
    return f.createTable(cft)
      .then(data => {
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  afterAll(done => {
    return f.deleteTable('DescribeTableTest')
      .then(data => {
        done();
      })
      .catch(err => {
        done(err);
      });
  });
  
  it('Can describe a table', () => {
    return f.describeTable('DescribeTableTest')
      .then(table => {
        expect(table.TableName).toBe('DescribeTableTest');
        expect(table.AttributeDefinitions.length).toBe(1);
      })
      .catch(err => {
        throw new Error(err);
      });
  });
});
