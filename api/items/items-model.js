const db = require('../data/db-config')

const find = () => {
    return db('items')
}

const findBy = (filter) => {
    return db('items').where(filter)
} 

const findById = (item_id) => {
    return db('items')
    .select('*')
    .where('item_id', item_id)
    .first()
}


const add = async (item) => {
    const [newUserObject] = await db('items')
        .insert(item, ['item_id', 'item_name', 'item_description', 'item_price'])
    return newUserObject 
}

module.exports = {
    find,
    findById,
    findBy,
    add,
}