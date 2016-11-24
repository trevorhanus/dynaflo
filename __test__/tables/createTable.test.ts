import {createTable, deleteTable} from '../../src/tables';

describe('createTable', () => {
  
  afterAll(done => {
    return deleteTable('Test')
      .then(data => {
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('Can create and delete a table', () => {
    const cft = require('../fixtures/testTable.cloudFormationTemplate.json')
    return createTable(cft)
      .then(tableDescription => {
        expect(tableDescription.TableName).toBe('Test');
      })
      .catch(err => {
        throw new Error(err);
      });
  });
});
