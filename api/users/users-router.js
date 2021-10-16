const router = require('express').Router()
const Users = require('./users-model')
const { validateUserId } = require('./users-middleware')


router.get('/', async (req, res, next) => {
    try {
        const users = await Users.find()
        res.json(users)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', validateUserId, (req, res) => {
    res.status(200).json(req.user)
})


module.exports = router
