const express = require('express');
const chekAuth = require('../middleware/check-auth');
const router = express.Router();

const UserController = require('../controllers/user');

router.post('/signup', UserController.user_signup);

router.post('/login', UserController.user_login);

router.delete('/:userId', chekAuth, UserController.user_delete);

module.exports = router;