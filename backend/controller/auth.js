const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const User = require('../model/user');

exports.signup = (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(422).json({ error: errors.array()[0].msg })
    }
    const newUser = new User(req.body);
    newUser.save()
    .then( (user) => {
        return res.json(user);
    } )
    .catch( () => {
        return res.status(400).json({ error: 'Failed to Save User' })
    } )
}

exports.signin = (req, res) => {
    const { userName, passwordInput } = req.body;

    console.log(req.body);

    const errors = validationResult(req);

    if( !errors.isEmpty() ) {
        return res.status(422).json({ error: errors.array()[0].msg });
    }

    User.findOne({userName}, (error, user) => {
        if(error || !user) {
            return res.status(400).json({ error: 'UserName Does Not Exist' });
        }
        if( !user.authenciate(passwordInput) ) {
            return res.status(400).json({ error: 'Wrong Password' })
        }

        const token = jwt.sign({ _id: user._id }, process.env.SECRET)
        res.cookie('token', token, { expire: new Date() + 9999 })

        const { userName, type } = user
        return res.json({ token, user: { userName, type } })
    })
}