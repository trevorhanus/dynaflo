import {createTable, describeTable, deleteTable} from '../../src/tables';

describe('describeTable', () => {
  it('Can describe a table', () => {
    const cft = require('../fixtures/testTable.cloudFormationTemplate.json')
    return createTable(cft)
      .then(tableDescription => {
        return describeTable('Test');
      })
      .then(table => {
        expect(table.TableName).toBe('Test');
        expect(table.AttributeDefinitions.length).toBe(1);
        return deleteTable('Test');
      })
      .catch(err => {
        throw new Error(err);
      });
  });
});
