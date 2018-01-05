import d from '../dynaflo_test_instance';

describe('Query', () => {

  beforeAll(done => {
    const testDocs = require('../fixtures/tvShows/tvShows.json').tvShows;
    const cft = require('../fixtures/tvShows/tvShows.cloudFormationTemplate.json')
    cft.Properties.TableName = 'TVShows';
    return d.createTable(cft)
      .then(data => {
        const promises = testDocs.map(doc => {
          return d.table('TVShows')
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
    return d.deleteTable('TVShows')
      .then(data => {
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('Can query a table with partition key', () => {
    return d.table('TVShows')
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
    return d.table('TVShows')
      .query()
      .whereKey(d.attr('title').eq('Westworld'))
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
    return d.table('TVShows')
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

  it('Can filter results', () => {
    return d.table('TVShows')
      .query('genre-network')
      .whereKey({
        genre: 'comedy',
        network: 'hbo'
      })
      .filter(
        d.attr('title').eq('Entourage')
      )
      .run()
      .then(data => {
        expect(data.Items.length).toBe(1);
      })
      .catch(err => {
        throw new Error(err);
      });
  });

  it('Can filter results with attributes value map', () => {
    return d.table('TVShows')
      .query('genre-network')
      .whereKey({
        genre: 'comedy',
        network: 'hbo'
      })
      .filter({
        title: 'Entourage'
      })
      .run()
      .then(data => {
        expect(data.Items.length).toBe(1);
      })
      .catch(err => {
        throw new Error(err);
      });
  });
});
