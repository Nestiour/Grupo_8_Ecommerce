const express = require('express');
const path = require('path');
const app = express();
const mainRoutes = require('./routes/main');

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

app.use('/', mainRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`servidor iniciado en https://localhost:${PORT}`)
})