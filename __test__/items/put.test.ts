import dn from '../../src/dynanode';

describe('Put', () => {
  it('Can insert an Item', () => {
    return testTable()
      .then(() => {
        return dn.table('Test')
          .put({id: '1234', name: 'Dino'})
          .run()
          .then(data => {
            return dn.table('Test')
              .get({id: '1234'})
              .run()
              .then(data => {
                expect(data.Item.name).toBe('Dino');
                return deleteTable();
              });
          })
          .catch(err => {
            return deleteTable()
              .then(() => {
                throw new Error(err);
              });
          });
      });
  });
});

///////////////////////////////

function testTable() {
  const cft = require('../fixtures/testTable.cloudFormationTemplate.json')
  return dn.createTable(cft);
}

function deleteTable() {
  return dn.deleteTable('Test');
}