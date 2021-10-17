const router = require('express').Router()
const Markets = require('./markets-model')
const restrict = require('../auth/restricted')

router.get('/', async (req, res, next) => {
    try {
        const markets = await Markets.getAll()
        res.json(markets)
    } catch (err) {
        next(err)
    }
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