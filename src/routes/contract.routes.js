const express = require('express');

const { getContractById } = require('../controller/contract.controller');
const { getProfile } = require('../middleware/getProfile');

const contractRouter = express.Router();

contractRouter.get('/:id', getProfile, getContractById);

module.exports = contractRouter;
