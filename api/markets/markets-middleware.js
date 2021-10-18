const Markets = require('./markets-model')
const jwt_decoded = require('jwt-decode')


async function validateMarketId(req, res, next) {
    try {
        const marketIdCheck = await Markets.findById(req.params.id)
        if (marketIdCheck) {
            req.market = marketIdCheck
            next()
        } else {
            res.status(404).json({
                status: 404,
                message: `User ${req.params.id} does not exist`
            })
        }
    } catch (err) {
        next(err)
    }
}

const matchedUserId = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        const decoded = jwt_decoded(token)
        const marketIdCheck = await Markets.findById(req.params.id)
        if (marketIdCheck.market_id === decoded.subject) {
            next()
        } else {
            res.status(404).json({
                status: 404,
                message: `Market ${decoded.subject} ID does not match`
            })
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    validateMarketId,
    matchedUserId
}