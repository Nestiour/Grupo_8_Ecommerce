const express = require('express');
const path = require('path');
const app = express();
const mainRoutes = require('./routes/mainRoutes');
const productRoutes = require('./routes/productsRoutes');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const logger = require('morgan');

app.use('/src/public/images/products', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));

app.use('/', mainRoutes);
app.use('/products', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});