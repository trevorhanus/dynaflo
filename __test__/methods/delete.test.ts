import d from '../dynaflo_test_instance';

describe('Delete', () => {

    beforeAll(done => {
        const cft = require('../fixtures/testTable.cloudFormationTemplate.json');
        cft.Properties.TableName = 'DeleteTest';
        return d.createTable(cft)
            .then(data => {
                done();
            })
            .catch(err => {
                done(err);
            });
    });

    beforeEach(done => {
        return d.table('DeleteTest')
            .put({
                id: '1234',
                name: 'Dino'
            })
            .run()
            .then(() => {
                done()
            })
            .catch(err => {
                done(err);
            });
    });

    afterAll(done => {
        return d.deleteTable('DeleteTest')
            .then(data => {
                done();
            })
            .catch(err => {
                done(err);
            });
    });

    it('Can delete an Item', () => {
        return d.table('DeleteTest')
            .delete({id: '1234'})
            .run()
            .then(data => {
                return d.table('DeleteTest')
                    .get({id: '1234'})
                    .run();
            })
            .then(data => {
                expect(data.Item).toBe(undefined);
            })
            .catch(err => {
                throw new Error(err);
            });
    });

    it('Can delete an Item conditionally', () => {
        return d.table('DeleteTest')
            .delete({id: '1234'})
            .when(d.attr('name').ne('Dino'))
            .run()
            .then(data => {
                // should not get here
                expect(true).toBe(false);
            })
            .catch(err => {
                expect(err.message).toBe('The conditional request failed');
            });
    });
});
