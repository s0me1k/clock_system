const express = require('express');
const router = express.Router();

// Require controller modules.
const controller = require('./controller');

router.post('/authUser', controller.authUser);
router.post('/getUserFromToken', controller.getUserFromToken);
router.post('/clockInUser', controller.clockInUser)
router.post('/clockOutUser', controller.clockOutUser)
router.post('/getClockTimes', controller.getClockTimes)
router.post('/clearList', controller.clearList)

module.exports = router;
