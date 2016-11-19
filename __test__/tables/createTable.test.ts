import {createTable, deleteTable} from '../../src/tables';

describe('createTable', () => {
  it('Can create and delete a table', () => {
    const cft = require('../fixtures/testTable.cloudFormationTemplate.json')
    return createTable(cft)
      .then(tableDescription => {
        expect(tableDescription.TableName).toBe('Test');
        // clean up table
        return deleteTable('Test');
      })
      .catch(err => {
        return deleteTable('Test')
          .then(() => {
            throw new Error(err);
          });
      });
  });
});
