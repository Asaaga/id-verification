const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');

router.post('/signup', authController.postAdminsignin)
router.post('/logout', authController.postLoggedOut);

module.exports = router;
