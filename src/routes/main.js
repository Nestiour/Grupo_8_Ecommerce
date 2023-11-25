const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainControllers');


router.get('/', mainController.Index);
router.get('/login', mainController.Login);
router.get('/cart', mainController.Cart);
router.get('/register', mainController.Register);

router.get('/crearProducto', mainController.Add);
router.get('/editarProducto', mainController.Edit);
router.get('/productDetails', mainController.ProductDetails)

module.exports = router;
