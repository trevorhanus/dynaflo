import {createTable, describeTable, deleteTable} from '../../src/tables';

describe('describeTable', () => {

  beforeAll(done => {
    const cft = require('../fixtures/testTable.cloudFormationTemplate.json');
    cft.Properties.TableName = 'DescribeTableTest';
    return createTable(cft)
      .then(data => {
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  afterAll(done => {
    return deleteTable('DescribeTableTest')
      .then(data => {
        done();
      })
      .catch(err => {
        done(err);
      });
  });
  
  it('Can describe a table', () => {
    return describeTable('DescribeTableTest')
      .then(table => {
        expect(table.TableName).toBe('DescribeTableTest');
        expect(table.AttributeDefinitions.length).toBe(1);
      })
      .catch(err => {
        throw new Error(err);
      });
  });
});
