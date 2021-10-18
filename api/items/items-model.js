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

const findByMarketId = (market_id) => {
    return db('markets')
    .select('*')
    .where('user_id', market_id)
    .first()
}

const update = async (changes, item_id) => {
  const [UpdatedItemObject] = await db('items')
  .update(changes, ['item_id', 'item_name', 'item_description', 'item_price'])
  .where('item_id', item_id)
  return UpdatedItemObject
}


const add = async (item) => {
    const [newItemObject] = await db('items')
        .insert(item, ['item_id', 'item_name', 'item_description', 'item_price'])
    return newItemObject 
}

const deleteById = item_id => {
    return db('items').where('item_id', item_id).del()
}

module.exports = {
    find,
    findById,
    findBy,
    add,
    update,
    deleteById,
    findByMarketId
}