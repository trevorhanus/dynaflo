import Fluent from '../../src/fluent';
import getTestConfig from '../../src/getTestConfig';

let f;
describe('Delete', () => {

  beforeAll(done => {
    const config = getTestConfig();
    f = new Fluent(config);
    const cft = require('../fixtures/testTable.cloudFormationTemplate.json');
    cft.Properties.TableName = 'DeleteTest';
    return f.createTable(cft)
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
    return f.table('DeleteTest')
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
    return f.deleteTable('DeleteTest')
      .then(data => {
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('Can delete an Item', () => {
    return f.table('DeleteTest')
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
    return f.table('DeleteTest')
      .delete({id: '1234'})
      .when(f.attr('name').ne('Dino'))
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
