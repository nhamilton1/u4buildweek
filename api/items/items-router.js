const router = require('express').Router()
const Items = require('./items-model')
const { 
    validateItemId, 
    validateItemPayload, 
    validMarket,
    checkMarketId
} = require('./items-middleware')
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
restrict,
validateItemPayload,
validMarket, 
    async (req, res, next) => {
    try {
        const token = req.headers.authorization
        const decoded = jwt_decoded(token)
        const marketCheck = await Items.findByMarketId(decoded.subject)
        const newItem = await Items.add({
            market_id: marketCheck.market_id,
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
validMarket,
checkMarketId, 
async (req, res, next) => {
    try {
        const token = req.headers.authorization
        const decoded = jwt_decoded(token)
        const marketCheck = await Items.findByMarketId(decoded.subject)
        const updatedItem = await Items.update({
            market_id: marketCheck.market_id,
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

router.delete('/:id', 
restrict, 
validateItemId, 
validMarket,
checkMarketId, 
async (req, res, next) => {
    try {
        await Items.deleteById(req.params.id)
        res.json(req.item)
    } catch (err) {
        next(err)
    }
})

module.exports = router