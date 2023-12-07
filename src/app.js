const express = require('express');
const path = require('path');
const app = express();
const mainRoutes = require('./routes/main');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE
const logger = require('morgan');

app.use('/src/public/images/products', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

app.use('/', mainRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`servidor iniciado en http://localhost:${PORT}`)
})