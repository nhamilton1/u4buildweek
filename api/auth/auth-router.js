const router = require('express').Router();
const bcrypt = require('bcrypt')
const User = require('../users/users-model')
const {
    checkUsernameFree,
    checkUsernameExists,
    checkUsernameAndPassword
} = require('./auth-middleware')
const buildToken = require('./token-builder')

router.post('/register',
checkUsernameAndPassword,
checkUsernameFree,
async (req, res, next) => {
    try {
        const { username, password } = req.body
        const hash = bcrypt.hashSync(password, 8)
        const user = { username, password: hash }
        const results = await User.add(user)
        res.status(201).json(results)
    } catch (err) {
        next(err)
    }
});

router.post('/login',
checkUsernameAndPassword,
checkUsernameExists,
async (req, res, next) => {
    if (bcrypt.compareSync(req.body.password, req.user.password)) {
        const token = buildToken(req.user)
        const userMarketInfo = await User.findUserMarketId(req.user.user_id)
        res.status(200).json({
            message: `Welcome, ${req.user.username}, ID: ${req.user.user_id}, Market_Id: ${userMarketInfo.market_id}`,
            token
        })
    } else {
        next({
            status: 401,
            message: 'invalid credentials'
        })
    }
});

module.exports = router;
