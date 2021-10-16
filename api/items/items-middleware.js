const Items = require('./items-model')
const yup = require('yup')

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
        .string(),
    item_name: yup
        .string()
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


module.exports = {
    validateItemId,
    validateItemPayload,
}