const { Op } = require('sequelize');

const getUnpaidJobs = async (req) => {
  const { Job, Contract } = req.app.get('models');
  const profileId = req.profile.id;

  const unpaidJobs = await Job.findAll({
    include: [
      {
        attributes: [],
        model: Contract,
        required: true,
        where: {
          [Op.or]: [{ ContractorId: profileId }, { ClientId: profileId }],
          status: {
            [Op.eq]: 'in_progress',
          },
        },
      },
    ],
    where: {
      [Op.or]: [
        { paid: false },
        { paid: null },
      ],
    },
  });

  return unpaidJobs;
};

module.exports = { getUnpaidJobs,  };
