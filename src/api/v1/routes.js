const express = require('express');
const userRoutesV1 = require('./user/routes');
const taskRoutesV1 = require('./task/routes');
const v1Routes = express.Router()
v1Routes.use('/users', userRoutesV1);
v1Routes.use('/tasks', taskRoutesV1);

module.exports = v1Routes;