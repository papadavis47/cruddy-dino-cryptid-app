const express = require('express');
const layouts = require('express-ejs-layouts');

const app = express();
app.set( 'view engine', 'ejs');
app.use(layouts);

// Some Routes Here

app.get('/', (req, res) => {
    res.render('home');
});

// Import controllers

app.use('/dinos', require('./routes/dinos'));

app.listen(3000, () => { console.log("You ae listening on port 3000")});