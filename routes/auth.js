const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth');

router.post('/signIn', controller.signIn);
router.post('/signUp', controller.signUp);
router.patch('/resetPassword', controller.resetPassword);

module.exports = router;