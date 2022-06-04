const express = require('express');

const { getUnpaidJobs, payJob } = require('../controller/job.controller');
const { getProfile } = require('../middleware/getProfile');

const jobRoutes = express.Router();

jobRoutes.get('/unpaid', getProfile, getUnpaidJobs);
jobRoutes.post('/:id/pay', getProfile, payJob);

module.exports = jobRoutes;
