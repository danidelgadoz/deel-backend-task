const express = require('express');

const { getUnpaidJobs } = require('../controller/job.controller');
const { getProfile } = require('../middleware/getProfile');

const jobRoutes = express.Router();

jobRoutes.get('/unpaid', getProfile, getUnpaidJobs);

module.exports = jobRoutes;
