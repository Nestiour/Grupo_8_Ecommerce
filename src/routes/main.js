const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainControllers');
const multer = require('multer');
const upload = multer({ dest: '../public/images' }); // Configura la carpeta de destino para subir archivos

router.get('/crearProducto/', mainController.Add);
router.post('/crearProducto', upload.single('imagen'), mainController.CreateProduct);

router.get('/editarProducto/:id', mainController.EditProductPage);
router.put('/:id', upload.single('imagen'), mainController.Update);

router.get('/eliminarProducto/:id', mainController.DeleteProduct);

//espacio//

router.get('/', mainController.Index);
router.get('/login', mainController.Login);
router.get('/cart', mainController.Cart);
router.get('/register', mainController.Register);

router.get('/productDetails', mainController.ProductDetails)

module.exports = router;
