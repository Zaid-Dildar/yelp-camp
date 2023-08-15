const express = require('express')
const router = express.Router({ mergeParams: true })
const users = require('../controllers/user')
const catchAsync = require('../utils/catchAsync')
const passport = require('passport')
const { checkReturnTo } = require('../middleware')


router.route('/register')
    .get(users.renderRegisterForm)
    .post(catchAsync(users.registerUser))

router.route('/login')
    .get(users.renderLoginForm)
    .post(checkReturnTo, passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), catchAsync(users.login))

router.get('/logout', users.logout)

module.exports = router