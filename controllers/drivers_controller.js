const Driver = require('../models/driver');

module.exports = {
    greeting(req, res) {
        res.send({ Hello: 'Kappa' });
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
    }
};
