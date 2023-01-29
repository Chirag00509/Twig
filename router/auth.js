const express = require('express');
const router = express.Router();
const { insertData, getPassword } = require('../util/controller');
const signup = require('../models/signup');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt')

router.get('/signup', function (req, res) {
    res.render('signup', {
    })
});

router.get('/login', function (req, res) {
    res.render('login', {
    })
});


router.post('/signup', async function (req, res) {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

        const signup = await insertData(username, email, password)
            .then(() => {
                res.status(201).json({
                    message: "Data Created",
                })
            })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err,
        })
    }
});

router.post('/login/password', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
}));


passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(new LocalStrategy(async function verify(username, password, cb) {
    try {        
        const getData = await getPassword(username);
        const validationPassword = getData.password;
        
        const newUsername = getData.username;

        if(newUsername == username) {
            validateUser(validationPassword);
        } 


        function validateUser(validationPassword) {
            bcrypt
                .compare(password, validationPassword)
                .then(res => {
                    if (res) {
                        return cb(null, username);
                    } else {
                        return cb(null, false, { message: "Incorrct username and password" });
                    }

                })
                .catch(err => console.error(err.message));
        }

    } catch (err) {
        console.log(err);
        return cb(null, false)
    }
},
));

module.exports = router;