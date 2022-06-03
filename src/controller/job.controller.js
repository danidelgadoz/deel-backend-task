const httpStatus = require('http-status');

const JobService = require('../services/job.service');

const getUnpaidJobs = async (req, res) => {
  try {
    const unpaidJobs = await JobService.getUnpaidJobs(req);
    if (!unpaidJobs) {
      res.sendStatus(httpStatus.NOT_FOUND);
    } else {
      res
        .status(httpStatus.OK)
        .json(unpaidJobs);
    }
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error });
  }
};

module.exports = {
  getUnpaidJobs,
};
