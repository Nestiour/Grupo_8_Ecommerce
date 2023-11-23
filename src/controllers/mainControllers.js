const mainControllers = {
    Index: (req, res) => {
        res.render('home')
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
    }
}

module.exports = mainControllers;