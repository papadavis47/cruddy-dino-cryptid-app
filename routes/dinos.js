// Mounted at '/dinos'

const express = require('express');
const router = express.Router();
const fs = require('fs');



// INDEX - GET

router.get('/', (req, res) => {
    // TODO: get all dinos, pass to page
    let allDinos = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(allDinos);
    console.log(dinoData);

    res.render('dinos/index', { dinos: []});
});

// NEW - GET

router.get('/new', (req, res) => {
    res.render('dinos/new');
});

// CREATE - POST


// SHOW - GET

router.get('/:id', (req, res) => {
    // TODO: get actual dino at id of req.params.id
});
// EDIT - GET

router.get('/edit/:id', (req, res) => {
    // TODO: get dino info and pass it in
    res.render('dinos/edit',  {dino: {id: req.params.id}});
});

// UPDATE - PUT

// DESTROY - DELETE



module.exports = router;