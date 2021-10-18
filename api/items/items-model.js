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

const update = async (changes, item_id) => {
  const [UpdatedItemObject] = await db('items')
  .update(changes, ['item_id', 'item_description', 'item_price'])
  .where('item_id', item_id) // problem is here with update item
  return UpdatedItemObject
}


const add = async (item) => {
    const [newItemObject] = await db('items')
        .insert(item, ['item_id', 'item_name', 'item_description', 'item_price'])
    return newItemObject 
}

module.exports = {
    find,
    findById,
    findBy,
    add,
    update
}