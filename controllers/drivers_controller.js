const Driver = require('../models/driver');

module.exports = {
    greeting(req, res) {
        res.send({ Hello: 'Kappa' });
    },

    create(req, res) {
        console.log(req.body);
        res.send({ Hello: 'Kappa' });
    }
};
