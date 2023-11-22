const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainControllers');

router.get('/', mainController.Index);
router.get('/login', mainController.Login);
router.get('/cart', mainController.Cart);
router.get('/register', mainController.Register);

module.exports = router;