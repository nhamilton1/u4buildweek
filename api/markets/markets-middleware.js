const Markets = require('./markets-model')

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


module.exports = {
    validateMarketId,
}