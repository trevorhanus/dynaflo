import Fluent from '../../src/fluent';
import getTestConfig from '../../src/getTestConfig';

let f;
const items = [
  {
    id: '1234',
    title: 'The Title',
    info: {
      rating: 5.5,
      cast: ['Larry', 'Moe']
    },
    recommended: true
  },
  {
    id: '12345',
    title: 'Second Title',
    info: {
      rating: 5.5,
      cast: ['Larry', 'Moe']
    },
    recommended: false
  }
];

describe('Update', () => {

  beforeAll(done => {
    f = new Fluent(getTestConfig());
    const cft = require('../../__test__/fixtures/testTable.cloudFormationTemplate.json')
    cft.Properties.TableName = 'UpdateTest';
    return f.createTable(cft)
      .then(data => {
        const promises = items.map(item => {
          return f.table('UpdateTest')
            .put(item)
            .run();
        });
        return Promise.all(promises)
          .then(data => {
            done();
          })
          .catch(err => {
            done(err);
          });
      });
  });

  afterAll(done => {
    return f.deleteTable('UpdateTest')
      .then(data => {
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('Set attributes', () => {
    return f.table('UpdateTest')
      .update({id: '1234'})
      .set({
        title: 'New Title',
        new: 'A new attribute'
      })
      .run()
      .then(data => {
        return f.table('UpdateTest')
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
    return f.table('UpdateTest')
      .update({id: '12345'})
      .remove('title', {info:{rating:true}})
      .run()
      .then(data => {
        return f.table('UpdateTest')
          .get({id: '12345'})
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
