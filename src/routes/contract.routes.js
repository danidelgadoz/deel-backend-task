const express = require('express');

const { getContractById, getNonTerminatedUserContracts } = require('../controller/contract.controller');
const { getProfile } = require('../middleware/getProfile');

const contractRouter = express.Router();

contractRouter.get('/',getProfile, getNonTerminatedUserContracts);
contractRouter.get('/:id', getProfile, getContractById);

module.exports = contractRouter;
