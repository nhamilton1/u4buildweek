const router = require('express').Router()
const Markets = require('./markets-model')
const restrict = require('../auth/restricted')
const { validateMarketId } = require('./markets-middleware')

router.get('/', async (req, res, next) => {
    try {
        const markets = await Markets.findAll()
        res.json(markets)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', validateMarketId, (req, res) => {
    res.status(200).json(req.market)
})

router.post('/', restrict, async (req, res, next) => {
    try {
        const newMarket = await Markets.add(req.body)
        res.json(newMarket)
    } catch (err) {
        next(err)
    }
})

module.exports = router