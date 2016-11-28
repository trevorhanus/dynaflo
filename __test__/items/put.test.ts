import Dynanode from '../../src/dynanode';

let dn;
describe('Put', () => {

  beforeAll(done => {
    dn = new Dynanode({
      region: 'us-west-2',
      endpoint: 'http://localhost:7777'
    });
    const cft = require('../fixtures/testTable.cloudFormationTemplate.json');
    cft.Properties.TableName = 'PutTest'
    return dn.createTable(cft)
      .then(data => {
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  afterAll(done => {
    return dn.deleteTable('PutTest')
      .then(data => {
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('Can insert and get an Item', () => {
    return dn.table('PutTest')
      .put({id: '1234', name: 'Dino'})
      .run()
      .then(data => {
        return dn.table('PutTest')
          .get({id: '1234'})
          .run();
      })
      .then(data => {
        expect(data.Item.name).toBe('Dino');
      });
  });

  it('Puts when condition is met', () => {
    return dn.table('PutTest')
      .put({id: '12346', name: 'Dino'})
      .run()
      .then(data => {
        return dn.table('PutTest')
          .put({
            id: '12346',
            neckLength: 20
          })
          .when(dn.attr('name').eq('Dino'))
          .run();
      })
      .then(data => {
        return dn.table('PutTest')
          .get({id: '12346'})
          .run();
      })
      .then(data => {
        expect(data.Item.neckLength).toBe(20);
      });
  });

  it('Throws when condition is not met', () => {
    return dn.table('PutTest')
      .put({id: '1234', name: 'Dino'})
      .run()
      .then(data => {
        return dn.table('PutTest')
          .put({
            id: '1234',
            neckLength: 20
          })
          .when(dn.attr('name').ne('Dino'))
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
    return dn.table('PutTest')
      .put({id: '1234', name: 'Dino'})
      .run()
      .then(data => {
        return dn.table('PutTest')
          .put({
            id: '1234',
            neckLength: 20
          })
          .when(dn.attr('id').notExists())
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
    return dn.table('PutTest')
      .put({id: '12345', name: 'Dino'})
      .run()
      .then(data => {
        return dn.table('PutTest')
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
    return dn.table('PutTest')
      .put({id: '54321', name: 'Dino'})
      .run()
      .then(data => {
        return dn.table('PutTest')
          .put({
            id: '54321',
            neckLength: 20
          })
          .when({name: 'Dino'})
          .run();
      })
      .then(data => {
        return dn.table('PutTest')
          .get({id: '54321'})
          .run();
      })
      .then(data => {
        // should not have gotten here
        expect(data.Item.neckLength).toBe(20);
      });
  });

  it('Can put a scalar attribute', () => {
    return dn.table('PutTest')
      .put({id: '12', 'my.scalar.key': 'Dino'})
      .run()
      .then(data => {
        return dn.table('PutTest')
          .get({id: '12'})
          .run();
      })
      .then(data => {
        expect(data.Item['my.scalar.key']).toBe('Dino');
      });
  });
});
