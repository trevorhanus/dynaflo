import Dynaflo from '../../src/';
import getTestConfig from '../../src/getTestConfig';

let d;
describe('Put', () => {

  beforeAll(done => {
    d = new Dynaflo(getTestConfig());
    const cft = require('../fixtures/testTable.cloudFormationTemplate.json');
    cft.Properties.TableName = 'PutTest'
    return d.createTable(cft)
      .then(data => {
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  afterAll(done => {
    return d.deleteTable('PutTest')
      .then(data => {
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('Can insert and get an Item', () => {
    return d.table('PutTest')
      .put({id: '1234', name: 'Dino'})
      .run()
      .then(data => {
        return d.table('PutTest')
          .get({id: '1234'})
          .run();
      })
      .then(data => {
        expect(data.Item.name).toBe('Dino');
      });
  });

  it('Puts when condition is met', () => {
    return d.table('PutTest')
      .put({id: '12346', name: 'Dino'})
      .run()
      .then(data => {
        return d.table('PutTest')
          .put({
            id: '12346',
            neckLength: 20
          })
          .when(d.attr('name').eq('Dino'))
          .run();
      })
      .then(data => {
        return d.table('PutTest')
          .get({id: '12346'})
          .run();
      })
      .then(data => {
        expect(data.Item.neckLength).toBe(20);
      });
  });

  it('Throws when condition is not met', () => {
    return d.table('PutTest')
      .put({id: '1234', name: 'Dino'})
      .run()
      .then(data => {
        return d.table('PutTest')
          .put({
            id: '1234',
            neckLength: 20
          })
          .when(d.attr('name').ne('Dino'))
          .run();
      })
      .then(data => {
        // should not have gotten here
        expect(true).toBe(false);
      })
      .catch(err => {
        expect(err.message).toBe('The conditional request failed');
      });
  });

  it('Throws when condition is not met: notExists', () => {
    return d.table('PutTest')
      .put({id: '1234', name: 'Dino'})
      .run()
      .then(data => {
        return d.table('PutTest')
          .put({
            id: '1234',
            neckLength: 20
          })
          .when(d.attr('id').notExists())
          .run();
      })
      .then(data => {
        // should not have gotten here
        expect(true).toBe(false);
      })
      .catch(err => {
        expect(err.message).toBe('The conditional request failed');
      });
  });

  it('Can use object as when condition', () => {
    return d.table('PutTest')
      .put({id: '12345', name: 'Dino'})
      .run()
      .then(data => {
        return d.table('PutTest')
          .put({
            id: '12345',
            neckLength: 20
          })
          .when({name: 'Little Foot'})
          .run();
      })
      .then(data => {
        // should not have gotten here
        expect(true).toBe(false);
      })
      .catch(err => {
        expect(err.message).toBe('The conditional request failed');
      });
  });

  it('Can use object as when condition', () => {
    return d.table('PutTest')
      .put({id: '54321', name: 'Dino'})
      .run()
      .then(data => {
        return d.table('PutTest')
          .put({
            id: '54321',
            neckLength: 20
          })
          .when({name: 'Dino'})
          .run();
      })
      .then(data => {
        return d.table('PutTest')
          .get({id: '54321'})
          .run();
      })
      .then(data => {
        // should not have gotten here
        expect(data.Item.neckLength).toBe(20);
      });
  });

  it('Can put a scalar attribute', () => {
    return d.table('PutTest')
      .put({id: '12', 'my.scalar.key': 'Dino'})
      .run()
      .then(data => {
        return d.table('PutTest')
          .get({id: '12'})
          .run();
      })
      .then(data => {
        expect(data.Item['my.scalar.key']).toBe('Dino');
      });
  });
});
