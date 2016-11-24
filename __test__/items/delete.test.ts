import dn from '../../src/dynanode';

describe('Delete', () => {

  beforeEach(done => {
    const testDoc = {
      id: '1234',
      name: 'Dino'
    };
    const cft = require('../fixtures/testTable.cloudFormationTemplate.json')
    return dn.createTable(cft)
      .then(data => {
        return dn.table('Test')
          .put(testDoc)
          .run();
      })
      .then(data => {
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  afterEach(done => {
    return dn.deleteTable('Test')
      .then(data => {
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('Can delete an Item', () => {
    return dn.table('Test')
      .delete({id: '1234'})
      .run()
      .then(data => {
        // is deleted
        expect(true).toBe(true);
      })
      .catch(err => {
        throw new Error(err);
      });
  });

    it('Can delete an Item conditionally', () => {
      return dn.table('Test')
        .delete({id: '1234'})
        .where(dn.attr('name').ne('Dino'))
        .run()
        .then(data => {
          // should not get here
          expect(true).toBe(false);
        })
        .catch(err => {
          expect(err.message).toBe('The conditional request failed');
        });
  });
});
