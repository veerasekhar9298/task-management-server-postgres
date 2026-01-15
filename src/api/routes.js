const express = require('express');

const v1Routes = require('./v1/routes');
const healthCheckRoutes = require('./healthCheckRoutes');


const router = app => {
    const apiRoutes = express.Router();

    apiRoutes.use('/health-check', healthCheckRoutes);

    // Mounting v1 routes on api
    apiRoutes.use('/v1', v1Routes);

    // If no routes matches
    apiRoutes.use((req, res, next) => {
        if (!req.route) {
            const error = new Error('No route matched');
            error.status = 404;
            return next(error);
        }

        return next();
    });
    app.use('/api', apiRoutes);
};

module.exports = router;
