// Mounted at '/cryptids'

const express = require('express');
const router = express.Router();
const fs = require('fs');

// INDEX - GET

router.get('/', (req, res) => {
    // get all cryptids, pass to page
    let allCrypts = fs.readFileSync('./cryptids.json');
    let cryptData = JSON.parse(allCrypts);

    res.render('cryptids/index', { cryptids: cryptData});
});

// NEW - GET

router.get('/new', (req, res) => {
    res.render('cryptids/new');
});

// CREATE - POST
router.post('/', (req, res) => {
    
    console.log(req.body);
    // Read Cryptids
    let crypts = fs.readFileSync('./cryptids.json');
    // JSON parse crypts
    let cryptData = JSON.parse(crypts);
    // Add req.body to the end of dinos
    cryptData.push(req.body);
    // JSON stringify dinos
    let newCrypts = JSON.stringify(cryptData);
    //write dinos
    fs.writeFileSync('./cryptids.json', newCrypts);

    res.redirect(`/cryptids/${cryptData.length -1}`);

});

// SHOW - GET

router.get('/:id', (req, res) => {
    // get actual crypt at id of req.params.id
    let crypts = fs.readFileSync('./cryptids.json');
    let cryptData = JSON.parse(crypts);
    let cryptIndex = parseInt(req.params.id);
    let oneCrypt = cryptData[cryptIndex];
    oneCrypt.id = cryptIndex;

    res.render('cryptids/show', {crypt: oneCrypt});
});

// EDIT - GET

router.get('/edit/:id', (req, res) => {
    //  get crypt info and pass it in
    let crypts = fs.readFileSync('./cryptids.json');
    crypts = JSON.parse(crypts);
    let cryptIndex = parseInt(req.params.id);
    let oneCrypt = crypts[cryptIndex];
    oneCrypt.id = cryptIndex;

    res.render('cryptids/edit',  {crypt: oneCrypt});
}); 

// UPDATE - PUT
router.put('/:id', (req, res) => {
    console.log(req.body);
    // read the file
    let crypts = fs.readFileSync('./cryptids.json');
    // json parse the dinos
    crypts = JSON.parse(crypts);
    // change the name of dino at index
    crypts[parseInt(req.params.id)] = req.body;

    fs.writeFileSync('./cryptids.json', JSON.stringify(dinos));

    res.redirect(`/cryptids/${req.params.id}`);
});

// DESTROY - DELETE
router.delete('/:id', (req, res) => {
    // Read cryptids
    let crypts = fs.readFileSync('./cryptids.json');
    // JSON parse crypts
    crypts = JSON.parse(crypts);
    // remove crypt from array at index
    let deadCrypt = crypts.splice(req.params.id, 1);
    //json stringify crypts
    fs.writeFileSync('./cryptids.json', JSON.stringify(crypts));

    
    console.log(`Press F to pay respects to ${deadCrypt[0].name}`);

    res.redirect('/cryptids');
})



module.exports = router;