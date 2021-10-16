const router = require('express').Router()
const Items = require('./items-model')
const { validateItemId, validateItemPayload } = require('./items-middleware')

router.get('/', async (req, res, next) => {
    try {
        const items = await Items.find()
        res.json(items)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', validateItemId, (req, res) => {
    res.status(200).json(req.item)
})

router.post('/', 
    validateItemPayload, 
    async (req, res, next) => {
    try {
        const newItem = await Items.add(req.body)
        res.json(newItem)
    } catch (err) {
        next(err)
    }
})

module.exports = router