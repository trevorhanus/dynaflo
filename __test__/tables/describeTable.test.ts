import {createTable, describeTable, deleteTable} from '../../src/tables';

describe('describeTable', () => {

  beforeAll(done => {
    const cft = require('../fixtures/testTable.cloudFormationTemplate.json')
    return createTable(cft)
      .then(data => {
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  afterAll(done => {
    return deleteTable('Test')
      .then(data => {
        done();
      })
      .catch(err => {
        done(err);
      });
  });
  
  it('Can describe a table', () => {
    return describeTable('Test')
      .then(table => {
        expect(table.TableName).toBe('Test');
        expect(table.AttributeDefinitions.length).toBe(1);
      })
      .catch(err => {
        throw new Error(err);
      });
  });
});
