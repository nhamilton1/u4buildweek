const Items = require('./items-model')
const yup = require('yup')
const jwt_decoded = require('jwt-decode')


const validateItemId = async (req, res, next) => {
    try {
        const itemIdCheck = await Items.findById(req.params.id)
        if (itemIdCheck) {
            req.item = itemIdCheck
            next()
        } else {
            res.status(404).json({
                status: 404,
                message: `Item ${req.params.id} does not exist`
            })
        }
    } catch (err) {
        next(err)
    }
}

const itemSchema = yup.object().shape({
    item_description: yup
        .string()
        .trim()
        .max(300),
    item_name: yup
        .string()
        .trim()
        .max(300)
        .required('Item name is required'),
    item_price: yup
        .number()
        .required('Item price is required'),
})

const validateItemPayload = async (req, res, next) => {
    try {
        const validatedAction = await itemSchema.validate(
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

const validMarket = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        const decoded = jwt_decoded(token)
        const marketCheck = await Items.findByMarketId(decoded.subject)
        if (marketCheck) {
            next()
        } else {
            res.status(404).json({
                status: 404,
                message: `${decoded.username} does not have a market, you need a market to post/delete an item.`
            })
        }
    } catch (err) {
        next(err)
    }
}

const checkMarketId = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        const decoded = jwt_decoded(token)
        const itemIdCheck = await Items.findById(req.params.id)
        const marketCheck = await Items.findByMarketId(decoded.subject)
        if (itemIdCheck.market_id !== marketCheck.market_id) {
            res.status(404).json({
                status: 404,
                message: `Item ${req.params.id} can only be deleted by the market that posted ${itemIdCheck.item_name} .`
            })
        } else {
            next()
        }
    } catch (err) {
        next(err)
    }
}


module.exports = {
    validateItemId,
    validateItemPayload,
    validMarket,
    checkMarketId
}