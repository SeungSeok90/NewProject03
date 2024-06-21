const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/agenda', (req, res) => {
    res.render('agenda');
});

router.get('/speakers', (req, res) => {
    res.render('speakers');
});

router.get('/venue', (req, res) => {
    res.render('venue');
});

router.get('/register', (req, res) => {
    res.render('register', { message: req.flash('registerMessage') });
});

router.post('/register', (req, res) => {
    const newRegistration = new Registration({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        company: req.body.company,
        department: req.body.department,
        position: req.body.position,
        consent: req.body.consent === 'on'
    });

    newRegistration.save((err) => {
        if (err) {
            req.flash('registerMessage', 'Registration failed.');
            res.redirect('/register');
        } else {
            req.flash('registerMessage', 'Successfully registered.');
            res.redirect('/register');
        }
    });
});

module.exports = router;