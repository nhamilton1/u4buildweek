const Markets = require('./markets-model')
const jwt_decoded = require('jwt-decode')
const yup = require('yup')

const marketSchema = yup.object().shape({
    market_name: yup
        .string()
        .trim()
        .max(150)
        .strict()
        .min(3, 'Must be at least three characters long')
        .required('market name is required')
})

const validateMarketPayload = async (req, res, next) => {
    try {
        const validatedAction = await marketSchema.validate(
            req.body,
            { strict: false, stripUnknown: true }
        )
        req.action = validatedAction
        next()
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}



async function validateMarketId(req, res, next) {
    try {
        const marketIdCheck = await Markets.findById(req.params.id) 
        if (marketIdCheck) {
            req.market = marketIdCheck
            next()
        } else {
            res.status(404).json({
                status: 404,
                message: `Market ${req.params.id} does not exist`
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
    matchedUserId,
    validateMarketPayload,
}