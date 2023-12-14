const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const mainController = {
    index: (req, res) => {
        res.render('home', { products, toThousand });
    },
    login: (req, res) => {
        res.render('login');
    },
    cart: (req, res) => {
        res.render('cart');
    },
    register: (req, res) => {
        res.render('register');
    }
};

module.exports = mainController;