import Dynanode from '../../src/dynanode';
import getTestConfig from '../../src/getTestConfig';

let dn;
describe('Delete', () => {

  beforeAll(done => {
    const config = getTestConfig();
    dn = new Dynanode(config);
    const cft = require('../fixtures/testTable.cloudFormationTemplate.json');
    cft.Properties.TableName = 'DeleteTest';
    return dn.createTable(cft)
      .then(data => {
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  beforeEach(done => {
    const testDoc = {
      id: '1234',
      name: 'Dino'
    };
    return dn.table('DeleteTest')
      .put(testDoc)
      .run()
      .then(data => {
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  afterAll(done => {
    return dn.deleteTable('DeleteTest')
      .then(data => {
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('Can delete an Item', () => {
    return dn.table('DeleteTest')
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
    return dn.table('DeleteTest')
      .delete({id: '1234'})
      .when(dn.attr('name').ne('Dino'))
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
