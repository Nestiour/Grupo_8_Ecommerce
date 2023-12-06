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
        res.render('crearProducto')
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