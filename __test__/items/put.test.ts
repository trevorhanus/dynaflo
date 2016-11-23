import dn from '../../src/dynanode';

xdescribe('Put', () => {

  beforeEach(done => {
    const cft = require('../fixtures/testTable.cloudFormationTemplate.json')
    return dn.createTable(cft)
      .then(data => {
        done();
      });
  });

  afterEach(done => {
    return dn.deleteTable('Test')
      .then(data => {
        done();
      });
  });

  it('Can insert and get an Item', () => {
    return dn.table('Test')
      .put({id: '1234', name: 'Dino'})
      .run()
      .then(data => {
        return dn.table('Test')
          .get({id: '1234'})
          .run();
      })
      .then(data => {
        expect(data.Item.name).toBe('Dino');
      });
  });

  it('Puts when condition is met', () => {
    return dn.table('Test')
      .put({id: '1234', name: 'Dino'})
      .run()
      .then(data => {
        return dn.table('Test')
          .put({
            id: '1234',
            neckLength: 20
          })
          .where(dn.attr('name').eq('Dino'))
          .run();
      })
      .then(data => {
        return dn.table('Test')
          .get({id: '1234'})
          .run();
      })
      .then(data => {
        expect(data.Item.neckLength).toBe(20);
      });
  });

  it('Throws when condition is not met', () => {
    return dn.table('Test')
      .put({id: '1234', name: 'Dino'})
      .run()
      .then(data => {
        return dn.table('Test')
          .put({
            id: '1234',
            neckLength: 20
          })
          .where(dn.attr('name').ne('Dino'))
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

  it('Can put a scalar attribute', () => {
    return dn.table('Test')
      .put({id: '1234', 'my.scalar.key': 'Dino'})
      .run()
      .then(data => {
        return dn.table('Test')
          .get({id: '1234'})
          .run();
      })
      .then(data => {
        expect(data.Item['my.scalar.key']).toBe('Dino');
      });
  });
});
