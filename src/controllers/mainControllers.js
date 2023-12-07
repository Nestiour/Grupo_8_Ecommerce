const fs = require('fs');
const path = require('path');
const productsDatabase = require('../data/productsDataBase.json');

const mainControllers = {

    Index: (req, res) => {
        res.render('home', { products: productsDatabase });
    },
    Login: (req, res) => {
        res.render('login')
    },
    Cart: (req, res) => {
        res.render('cart')
    },
    Register: (req, res) => {
        res.render('register')
    },
    ProductDetails: (req, res) => {
        res.render('productDetails')
    },
    Add: (req, res) => {
        res.render('crearProducto', { product: {} }); // Puedes pasar un objeto vacío si aún no tienes datos del producto
    },
    Edit: (req, res) => {
        res.render('editarProducto')
    },

    CreateProduct: (req, res) => {
        const { name, price, category, description } = req.body;
        const image = req.file ? req.file.filename : null;

        const newProduct = {
            id: productsDatabase.length + 1,
            name,
            price,
            category,
            description,
            image
        };

        productsDatabase.push(newProduct);

        fs.writeFileSync(path.join(__dirname, '../data/productsDataBase.json'), JSON.stringify(productsDatabase, null, 2));

        res.redirect('/'); // Puedes redirigir a la página principal o a la lista de productos después de la creación.
    },

    EditProductPage: (req, res) => {
        const productId = parseInt(req.params.id);
        const product = productsDatabase.find(p => p.id === productId);
        res.render('editarProducto', { product });
    },

    EditProduct: (req, res) => {
        const productId = parseInt(req.params.id);
        const { name, price, category, description } = req.body;
        const image = req.file ? req.file.filename : null;

        const updatedProduct = {
            id: productId,
            name,
            price,
            category,
            description,
            image
        };

        const index = productsDatabase.findIndex(p => p.id === productId);
        productsDatabase[index] = updatedProduct;

        fs.writeFileSync(path.join(__dirname, '../data/productsDataBase.json'), JSON.stringify(productsDatabase, null, 2));

        res.redirect('/');
    },

    update: (req, res) => {
		
		const idProd = req.params.id;
		const {name, price,descount,category,description}=req.body;
		const indexProducto=products.findIndex(producto => producto.id == idProd);
		if(indexProducto!==-1){
			products[indexProducto].name=name;
			products[indexProducto].price=price;
			products[indexProducto].descount=descount;
			products[indexProducto].category=category;
			products[indexProducto].description=description;
			fs.writeFileSync(productsFilePath, JSON.stringify(products));
			console.log('producto editado');
			res.redirect('/');
		}else{
			console.log('Producto no encontrado');
			res.send('Producto no encontrado');
		}
	},
    
    DeleteProduct: (req, res) => {
        const productId = parseInt(req.params.id);

        const index = productsDatabase.findIndex(p => p.id === productId);
        if (index !== -1) {
            productsDatabase.splice(index, 1);

            fs.writeFileSync(path.join(__dirname, '../data/productsDataBase.json'), JSON.stringify(productsDatabase, null, 2));
        }

        res.redirect('/');
    }
}

module.exports = mainControllers;