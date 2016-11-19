import dn from '../../src/dynanode';

describe('Put', () => {

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

  it('Can set the ReturnConsumedCapacity', () => {
    const params = dn.table('Test')
      .put({id: '1235', name: 'Little Foot'})
      .consumedCapacity('INDEXES');
    expect(params._params.ReturnConsumedCapacity).toBe('INDEXES');
  });

  it('Can set the ReturnItemCollectionMetrics', () => {
    const params = dn.table('Test')
      .put({id: '12345'})
      .returnItemCollectionMetrics('SIZE');
    expect(params._params.ReturnItemCollectionMetrics).toBe('SIZE');
  })
});
