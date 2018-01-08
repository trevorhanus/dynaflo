import d from '../dynaflo_test_instance';

describe('Batch write', () => {

    beforeAll(done => {
        const cft = require('../fixtures/testTable.cloudFormationTemplate.json');
        cft.Properties.TableName = 'BatchTest'
        return d.createTable(cft)
            .then(data => {
                done();
            })
            .catch(err => {
                done(err);
            });
    });

    afterAll(done => {
        return d.deleteTable('BatchTest')
            .then(data => {
                done();
            })
            .catch(err => {
                done(err);
            });
    });

    it('Can batch put items', () => {
        const items = [
            {id: '1234', name: 'Dino'},
            {id: '1235', name: 'Clifford'},
            {id: '1236', name: 'Santas Helper'}
        ];
        return d.table('BatchTest')
            .batchPut(items)
            .run()
            .then(data => {
                return d.table('BatchTest')
                    .scan()
                    .run();
            })
            .then(data => {
                expect(data.Items.length).toBe(3);
            })
            .catch(err => {
                throw err;
            });
    });

    it('Can batch delete items', () => {
        const keysToDelete = [
            {id: '1234'},
            {id: '1235'}
        ];
        return d.table('BatchTest')
            .batchDelete(keysToDelete)
            .run()
            .then(data => {
                return d.table('BatchTest')
                    .scan()
                    .run();
            })
            .then(data => {
                expect(data.Items.length).toBe(1);
            })
            .catch(err => {
                throw err;
            });
    });

    it('Can batch delete and put in same request', () => {
        const keysToDelete = [
            {id: '1236'}
        ];
        const items = [
            {id: '1234', name: 'Dino'},
            {id: '1235', name: 'Clifford'}
        ];
        return d.table('BatchTest')
            .batchDelete(keysToDelete)
            .batchPut(items)
            .run()
            .then(data => {
                return d.table('BatchTest')
                    .scan()
                    .run();
            })
            .then(data => {
                expect(data.Items.length).toBe(2);
            })
            .catch(err => {
                throw err;
            });
    });
});