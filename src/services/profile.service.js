const deposit = async (req) => {
  const clientId = req.params.userId;
  const depositAmount = req.body.amount;
  const { Job, Contract, Profile } = req.app.get('models');
  const sequelize = req.app.get('sequelize');
  const depositTransaction = await sequelize.transaction();
  let response = {};

  try {
    const client = await Profile.findByPk(clientId, { transaction: depositTransaction });

    const totalJobsToPay = await Job.findAll(
      {
        attributes: {
          include: [[sequelize.fn('SUM', sequelize.col('price')), 'totalPrice']],
        },
        include: [
          {
            attributes: [],
            model: Contract,
            required: true,
            where: {
              ClientId: clientId,
              status: 'in_progress',
            },
          },
        ],
        where: {
          paid: null,
        },
      },
      { transaction: depositTransaction },
    );

    const { totalPrice } = totalJobsToPay[0].dataValues;
    if (totalPrice == null) {
      response = `There are no unpaid jobs for client ${clientId}.`;
    }

    const depositThreshold = totalPrice * 0.25;
    if (depositAmount > depositThreshold) {
      response = `Maximum deposit amount reached. Deposit ${depositAmount} is more than 25% of client ${clientId} total of jobs to pay`;

    } else {
      await client.increment({ balance: depositAmount }, { transaction: depositTransaction });

      client.balance += depositAmount;
  
      await depositTransaction.commit();
      response = client;
    }
    
    return response;

  } catch (error) {
    await depositTransaction.rollback();
  }
};

module.exports = {
  deposit,
};
