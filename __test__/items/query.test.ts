import Fluent from '../../src/';
import getTestConfig from '../../src/getTestConfig';

let f: Fluent;
describe('Query', () => {

  beforeAll(done => {
    const testDocs = require('../fixtures/tvShows/tvShows.json').tvShows;
    f = new Fluent(getTestConfig());
    const cft = require('../fixtures/tvShows/tvShows.cloudFormationTemplate.json')
    cft.Properties.TableName = 'TVShows';
    return f.createTable(cft)
      .then(data => {
        const promises = testDocs.map(doc => {
          return f.table('TVShows')
            .put(doc)
            .run();
        });
        return Promise.all(promises);
      })
      .then(data => {
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  afterAll(done => {
    return f.deleteTable('TVShows')
      .then(data => {
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('Can query a table with partition key', () => {
    return f.table('TVShows')
      .query()
      .whereKey({title: 'Westworld'})
      .run()
      .then(data => {
        expect(data.Items[0].network).toBe('hbo');
        expect(data.Items[0].info.rating).toBe(9.1);
      })
      .catch(err => {
        throw new Error(err);
      });
  });

  it('Can query a table with key condition', () => {
    return f.table('TVShows')
      .query()
      .whereKey(f.attr('title').eq('Westworld'))
      .run()
      .then(data => {
        expect(data.Items[0].network).toBe('hbo');
        expect(data.Items[0].info.rating).toBe(9.1);
      })
      .catch(err => {
        throw new Error(err);
      });
  });

  it('Can query a table with hash and range', () => {
    return f.table('TVShows')
      .query('genre-network')
      .whereKey({
        genre: 'comedy',
        network: 'hbo'
      })
      .run()
      .then(data => {
        expect(data.Items[0].network).toBe('hbo');
        expect(data.Items[0].title).toBe('Silicon Valley');
      })
      .catch(err => {
        throw new Error(err);
      });
  });

  xit('Can filter results', () => {
    return f.table('TVShows')
      .query('genre-network')
      .whereKey()
      .run()
      .then(data => {
        expect(data.Items.length).toBe(2);
      })
      .catch(err => {
        throw new Error(err);
      });
  });
});
