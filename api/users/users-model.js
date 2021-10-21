const db = require('../data/db-config')


function find() {
    return db('users').select('user_id', 'username')
}


function findBy(filter) {
    return db('users').where(filter)
}

const findUserMarketId = (user_id) => {
    return db('users as u')
        .leftJoin('markets as m', 'u.user_id', 'm.user_id')
        .select('u.user_id', 'u.username', 'm.market_id', 'm.market_name')
        .where('u.user_id', user_id)
        .first()
}


function findById(user_id) {
    return db('users')
        .select('user_id', 'username')
        .where('user_id', user_id)
        .first()
}


async function add(user) {
    const [newUserObject] = await db('users').insert(user, ['user_id', 'username'])
    return newUserObject
}



module.exports = {
    find,
    findBy,
    findById,
    add,
    findUserMarketId
}
