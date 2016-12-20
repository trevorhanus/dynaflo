import d from '../dynaflo_test_instance';

describe('Scan', () => {

  beforeAll(done => {
    const testDocs = require('../fixtures/tvShows/tvShows.json').tvShows;
    const cft = require('../fixtures/tvShows/tvShows.cloudFormationTemplate.json')
    cft.Properties.TableName = 'ScanTest';
    return d.createTable(cft)
      .then(data => {
        const promises = testDocs.map(doc => {
          return d.table('ScanTest')
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
    return d.deleteTable('ScanTest')
      .then(data => {
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('Can scan a table', () => {
    return d.table('ScanTest')
      .scan()
      .run()
      .then(data => {
        expect(data.Items.length).toBe(5);
      })
      .catch(err => {
        throw new Error(err);
      });
  });

  it('Can scan on a secondary index', () => {
    return d.table('ScanTest')
      .scan('genre-network')
      .run()
      .then(data => {
        expect(data.Items.length).toBe(5);
      })
      .catch(err => {
        throw new Error(err);
      });
  });

  it('Can limit a scan', () => {
    return d.table('ScanTest')
      .scan()
      .limit(2)
      .run()
      .then(data => {
        expect(data.Items.length).toBe(2);
      })
      .catch(err => {
        throw new Error(err);
      });
  });

  it('Can pluck attributes', () => {
    return d.table('ScanTest')
      .scan()
      .pluck('network')
      .run()
      .then(data => {
        expect(data.Items.length).toBe(5);
        expect(data.Items[0].genre).toBe(undefined);
        expect(data.Items[0].network).toBeDefined();
      })
      .catch(err => {
        throw new Error(err);
      });
  });

  it('Can pluck attributes with shorthand', () => {
    return d.table('ScanTest')
      .scan()
      .pluck({
        info: ['stars']
      })
      .run()
      .then(data => {
        expect(data.Items.length).toBe(5);
        expect(data.Items[0].genre).toBe(undefined);
        expect(data.Items[0].info.rating).toBe(undefined);
        expect(data.Items[0].info.stars).toBeDefined();
      })
      .catch(err => {
        throw new Error(err);
      });
  });
});
