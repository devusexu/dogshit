const express = require('express');
const router = express.Router();

const { register, login, index} = require('../controllers/auth');

router.post('/', register);
router.post('/login', login);

// return all users - used for development
router.get('/', index);

module.exports = router;