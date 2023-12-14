const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const upload = require("../middlewares/multer");

const productsController = {
	index: (req, res) => {
		res.render('home', { products, toThousand });
	  },
	  detail: (req, res) => {
		const idProd = req.params.id;
		const product = products.find(product => product.id == idProd);
		res.render('products/detailProduct', { product, toThousand });
	  },
	  create: (req, res) => {
		  res.render('createProducto');
	  },
	  store: (req, res) => {
		try {
		  // Obtener el último ID y asignar uno nuevo
		  const lastId = products.length > 0 ? products[products.length - 1].id : 0;
		  const newProduct = {
			id: lastId + 1,
			...req.body,
			image: req.file.filename,
		  };
		  products.push(newProduct);
		  fs.writeFileSync(productsFilePath, JSON.stringify(products));
		  res.redirect('/products');
		} catch (error) {
		  console.log('error: ', error);
		}
	  },
  edit: (req, res) => {
    const idProd = req.params.id;
    const product = products.find(product => product.id == idProd);
    res.render('products/editProducto', { product });
  },
  update: (req, res) => {
    const idProd = req.params.id;
    const { name, price, category, description, image } = req.body;
    const indexProducto = products.findIndex(product => product.id == idProd);
    if (indexProducto !== -1) {
      // Actualizar todos los campos incluyendo el ID
      products[indexProducto] = { id: idProd, name, price, category, description, image };
      fs.writeFileSync(productsFilePath, JSON.stringify(products));
      console.log('Producto editado');
      res.redirect('/');
    } else {
      console.log('Producto no encontrado');
      res.send('Producto no encontrado');
    }
  },
  destroy: (req, res) => {
    const idProd = req.params.id;
    products = products.filter(product => product.id != idProd);
    fs.writeFileSync(productsFilePath, JSON.stringify(products));
    console.log('Producto eliminado correctamente');
    res.redirect('/products');
  },
};

module.exports = productsController;