import Dynaflo from '../../src/';
import getTestConfig from '../../src/getTestConfig';

let d;
describe('describeTable', () => {

  beforeAll(done => {
    d = new Dynaflo(getTestConfig());
    const cft = require('../fixtures/testTable.cloudFormationTemplate.json');
    cft.Properties.TableName = 'DescribeTableTest';
    return d.createTable(cft)
      .then(data => {
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  afterAll(done => {
    return d.deleteTable('DescribeTableTest')
      .then(data => {
        done();
      })
      .catch(err => {
        done(err);
      });
  });
  
  it('Can describe a table', () => {
    return d.describeTable('DescribeTableTest')
      .then(table => {
        expect(table.TableName).toBe('DescribeTableTest');
        expect(table.AttributeDefinitions.length).toBe(1);
      })
      .catch(err => {
        throw new Error(err);
      });
  });
});
