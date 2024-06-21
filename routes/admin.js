const express = require('express');
const router = express.Router();
const passport = require('passport');
const Registration = require('../models/Registration');
const xlsx = require('xlsx');
const path = require('path');

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/admin/login');
}

router.get('/login', (req, res) => {
    res.render('login', { message: req.flash('loginMessage') });
});

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/admin',
    failureRedirect: '/admin/login',
    failureFlash: true
}));

router.get('/', isLoggedIn, (req, res) => {
    Registration.find({}, (err, registrations) => {
        if (err) throw err;
        res.render('admin', { registrations });
    });
});

router.get('/export', isLoggedIn, (req, res) => {
    Registration.find({}, (err, registrations) => {
        if (err) throw err;

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(registrations.map(r => r.toObject()));
        xlsx.utils.book_append_sheet(wb, ws, 'Registrations');

        const filePath = path.join(__dirname, '../public/registrations.xlsx');
        xlsx.writeFile(wb, filePath);

        res.download(filePath);
    });
});

module.exports = router;