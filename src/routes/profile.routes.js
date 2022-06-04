const express = require('express');

const { deposit } = require('../controller/profile.controller');

const profileRoutes = express.Router();

profileRoutes.post('/deposit/:userId', deposit);

module.exports = profileRoutes;
