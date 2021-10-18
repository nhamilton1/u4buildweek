const router = require('express').Router()
const Items = require('./items-model')
const { validateItemId, validateItemPayload } = require('./items-middleware')
const restrict = require('../auth/restricted')
const jwt_decoded = require('jwt-decode')

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
restrict, 
    async (req, res, next) => {
    try {
        const token = req.headers.authorization
        const decoded = jwt_decoded(token)
        const newItem = await Items.add({
            market_id: decoded.subject,
            item_name: req.body.item_name,
            item_description: req.body.item_description,
            item_price: req.body.item_price
        })
        res.json(newItem)
    } catch (err) {
        next(err)
    }
})

router.put('/:id', 
restrict,
validateItemId, 
validateItemPayload,  
async (req, res, next) => {
    try {
        const token = req.headers.authorization
        const decoded = jwt_decoded(token)
        const updatedItem = await Items.update({
            market_id: decoded.subject,
            item_name: req.body.item_name,
            item_description: req.body.item_description,
            item_price: req.body.item_price,
            item_id: req.params.id
        }, req.params.id)
        res.json(updatedItem)
    } catch (err) {
        next(err)
    }
})

module.exports = router