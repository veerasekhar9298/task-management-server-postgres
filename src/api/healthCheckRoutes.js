const express = require('express');

const healthCheckRoutes = express.Router();

healthCheckRoutes.get('/', (req, res) => {
    // do app logic here to determine if app is truly healthy
    // you should return 200 if healthy, and anything else will fail
    res.status(200).json({ status: 'UP' });
});

module.exports = healthCheckRoutes;
