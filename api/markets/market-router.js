const router = require('express').Router()
const Markets = require('./markets-model')
const restrict = require('../auth/restricted')
const { 
    validateMarketId, 
    validateMarketPayload,
    uniqueMarketName,
    userAlreadyHasMarket,
} = require('./markets-middleware')
const jwt_decoded = require('jwt-decode')

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

router.post('/', 
restrict, 
validateMarketPayload, 
uniqueMarketName, 
userAlreadyHasMarket,
async (req, res, next) => {
    try {
        const token = req.headers.authorization
        const decoded = jwt_decoded(token)
        const newMarket = await Markets.add({
            user_id: decoded.subject,
            market_name: req.body.market_name
        })
        res.json(newMarket)
    } catch (err) {
        next(err)
    }
})

module.exports = router