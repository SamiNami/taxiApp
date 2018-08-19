const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const Driver = mongoose.model('driver');

describe('Drivers controller', () => {
    it('Post to /api/drivers creates a new driver', done => {
        Driver.count().then(count => {
            request(app)
                .post('/api/drivers')
                .send({ email: 'test@test.com' })
                .end(() => {
                    Driver.count().then(newCount => {
                        assert(count + 1 === newCount);
                        done();
                    });
                });
        });
    });

    it('Put to /api/drivers edits a new driver', done => {
        Driver.create({ email: 'kappa@gmail.com', driving: false }).then(
            driver => {
                request(app)
                    .put(`/api/drivers/${driver.id}`)
                    .send({ driving: true })
                    .end(() => {
                        Driver.findOne({ email: 'kappa@gmail.com' }).then(
                            driver => {
                                assert(driver.driving === true);
                                done();
                            }
                        );
                    });
            }
        );
    });

    it('Delete to /api/drivers deltes a driver', done => {
        Driver.create({ email: 'kappa@gmail.com', driving: false }).then(
            driver => {
                request(app)
                    .delete(`/api/drivers/${driver.id}`)
                    .end(() => {
                        Driver.findOne({ email: 'kappa@gmail.com' }).then(
                            driver => {
                                assert(driver === null);
                                done();
                            }
                        );
                    });
            }
        );
    });
});
