const Driver = require('../models/driver');

module.exports = {
    greeting(req, res) {
        res.send({ Hello: 'Kappa' });
    },

    index(req, res, next) {
        const { lng, lang } = req.query;

        Driver.geoNear(
            { type: 'Point', coordinates: [lng, lat] },
            // asume a sphere and the max distance is 200km
            { spherical: true, maxDistance: 200000 }
        )
            .then(drivers => {
                res.send(drivers);
            })
            .catch(next);
    },

    create(req, res, next) {
        const driverProps = req.body;

        Driver.create(driverProps)
            .then(driver => {
                res.send(driver);
            })
            .catch(next);
    },

    edit(req, res, next) {
        const driverId = req.params.id;
        const driverProps = req.body;
        // new: true set it so that the function returns the new driver object/model
        Driver.findByIdAndUpdate(driverId, driverProps, { new: true })
            .then(driver => res.send(driver))
            .catch(next);
    },

    delete(req, res, next) {
        const driverId = req.params.id;
        Driver.findByIdAndRemove(driverId)
            .then(driver => res.status(204).send(driver))
            .catch(next);
    }
};
