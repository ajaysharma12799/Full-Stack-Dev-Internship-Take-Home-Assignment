const router = require('express').Router();
const { check } = require('express-validator');

const { signup, signin } = require('../controller/auth');

// POST ROUTE FOR SIGNUP
router.post('/signup', [
    check('userName', 'UserName Should be Atleast 3 character and Maximum 20 CHARACTER').isLength({ min: 3, max: 20 }),
    check('password', 'Password Should be Atleast 5 character and Maximum 25 CHARACTER').isLength({ min: 5, max: 25 })
], signup);

// POST ROUTE FOR SIGNIN
router.post('/signin', [
    check('userName', 'UserName is Required || UserName Should be Atleast 3 character and Maximum 20 CHARACTER').isLength({ min: 3, max: 20 }),
    check('passwordInput', 'Password is Required || Password Should be Atleast 5 Character and Maximum 25 Character').isLength({ min: 5, max: 25 })
], signin);

module.exports = router;