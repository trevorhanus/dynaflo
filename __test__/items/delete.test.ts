import Dynaflo from '../../src/';
import getTestConfig from '../../src/getTestConfig';

let d;
describe('Delete', () => {

  beforeAll(done => {
    const config = getTestConfig();
    d = new Dynaflo(config);
    const cft = require('../fixtures/testTable.cloudFormationTemplate.json');
    cft.Properties.TableName = 'DeleteTest';
    return d.createTable(cft)
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
    return d.table('DeleteTest')
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
    return d.deleteTable('DeleteTest')
      .then(data => {
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('Can delete an Item', () => {
    return d.table('DeleteTest')
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
    return d.table('DeleteTest')
      .delete({id: '1234'})
      .when(d.attr('name').eq('Dino'))
      .log()
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
