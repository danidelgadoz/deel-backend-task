const express = require('express');
const { getBestProfession } = require('../controller/admin.controller');

const contractRouter = express.Router();

contractRouter.get('/best-profession', getBestProfession);

module.exports = contractRouter;
