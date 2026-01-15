const express = require('express');
const userRoutesV1 = require('./user/routes');
const v1Routes = express.Router()
v1Routes.use('/users', userRoutesV1);

module.exports = v1Routes;