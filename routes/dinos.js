// Mounted at '/dinos'

const express = require('express');
const router = express.Router();
const fs = require('fs');



// INDEX - GET

router.get('/', (req, res) => {
    // get all dinos, pass to page
    let allDinos = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(allDinos);

    res.render('dinos/index', { dinos: dinoData});
});

// NEW - GET

router.get('/new', (req, res) => {
    res.render('dinos/new');
});

// CREATE - POST
router.post('/', (req, res) => {
    console.log("It Worked");
    console.log(req.body);
    // Read Dinos
    let dinos = fs.readFileSync('./dinosaurs.json');
    // JSON parse Dinos
    let dinoData = JSON.parse(dinos);
    // Add req.body to the end of dinos
    dinoData.push(req.body);
    // JSON stringify dinos
    let newDinos = JSON.stringify(dinoData);
    //write dinos
    fs.writeFileSync('./dinosaurs.json', newDinos);

    res.redirect(`/dinos/${dinoData.length -1}`);

});


// SHOW - GET

router.get('/:id', (req, res) => {
    // TODO: get actual dino at id of req.params.id
    let dinos = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(dinos);
    let dinoIndex = parseInt(req.params.id);
    let oneDino = dinoData[dinoIndex];

    res.render('dinos/show', {dino: oneDino});
});

// EDIT - GET

router.get('/edit/:id', (req, res) => {
    // TODO: get dino info and pass it in
    let dinos = fs.readFileSync('./dinosaurs.json');
    dinos = JSON.parse(dinos);
    let dinoIndex = parseInt(req.params.id);
    let oneDino = dinos[dinoIndex];
    oneDino.id = dinoIndex;

    res.render('dinos/edit',  {dino: {id: req.params.id}});
});

// UPDATE - PUT
router.put('/:id', (req, res) => {
    console.log(req.body);
    // read the file
    let dinos = fs.readFileSync('./dinosaurs.json');
    // json parse the dinos
    dinos = JSON.parse(dinos);
    // change the name of dino at index
    dinos[parseInt(req.params.id)] = req.body;

    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinos));

    res.redirect(`/dinos/${req.params.id}`);
});

// DESTROY - DELETE
router.delete('/:id', (req, res) => {
    // Read dinos
    let dinos = fs.readFileSync('./dinosaurs.json');
    // JSON parse dinos
    dinos = JSON.parse(dinos);
    // remove dino from array at index
    let deadDino = dinos.splice(req.params.id, 1);
    //json stringify dinos
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinos));

    // console.log(`Deleting dino at ${req.params.id}`);
    console.log(`Press F to pay respects to ${deadDino[0].name}`);

    res.redirect('/dinos');
})



module.exports = router;