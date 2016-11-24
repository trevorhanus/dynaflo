import dn from '../../src/dynanode';
import * as tu from '../../src/utils/testUtils';

describe('Update', () => {

  beforeAll(done => {
    return tu.createTable(done);
  });

  beforeEach(done => {
    const item1 = {
      id: '1234',
      title: 'The Title',
      info: {
        rating: 5.5,
        cast: ['Larry', 'Moe']
      },
      recommended: true
    };
    const item2 = {
      id: '12345',
      title: 'Second Title',
      info: {
        rating: 5.5,
        cast: ['Larry', 'Moe']
      },
      recommended: false
    };
    return tu.insertItems(done, [item1, item2]);
  });

  afterEach(done => {
    return tu.deleteItem(done);
  });

  afterAll(done => {
    return tu.deleteTable(done);
  });

  it('Set attributes', () => {
    return dn.table('Test')
      .update({id: '1234'})
      .set({
        title: 'New Title',
        new: 'A new attribute'
      })
      .run()
      .then(data => {
        return dn.table('Test')
          .get({id: '1234'})
          .run();
      })
      .then(data => {
        expect(data.Item.title).toBe('New Title');
        expect(data.Item.new).toBe('A new attribute');
      })
      .catch(err => {
        throw new Error(err);
      });
  });

  it('Remove attributes', () => {
    return dn.table('Test')
      .update({id: '1234'})
      .remove('title', {info: ['rating']})
      .run()
      .then(data => {
        return dn.table('Test')
          .get({id: '1234'})
          .run();
      })
      .then(data => {
        expect(data.Item.title).toBe(undefined);
        expect(data.Item.info.rating).toBe(undefined);
        expect(data.Item.info.cast.length).toBe(2);
      })
      .catch(err => {
        throw new Error(err);
      });
  });
});
