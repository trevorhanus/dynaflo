import dn from '../dynanode';

export function createTable(done) {
  const cft = require('../../__test__/fixtures/testTable.cloudFormationTemplate.json')
  return dn.createTable(cft)
    .then(data => {
      done();
    })
    .catch(err => {
      done(err);
    });
}

export function insertItem(done, item) {
  return dn.table('Test')
    .put(item)
    .run()
    .then(data => {
      done();
    })
    .catch(err => {
      done(err);
    });
}

export function insertItems(done, items) {
  const promises = items.map(item => {
    return dn.table('Test')
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
}

export function deleteItem(done) {
  return dn.table('Test')
    .delete({id: '1234'})
    .run()
    .then(data => {
      done();
    })
    .catch(err => {
      done(err);
    });
}

export function deleteTable(done) {
  return dn.deleteTable('Test')
    .then(data => {
      done();
    })
    .catch(err => {
      done(err);
    });
}