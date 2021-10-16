const db = require('../data/db-config')


function find() {
    return db('users').select('user_id', 'username')
}


function findBy(filter) {
    return db('users').where(filter)
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
    add
}
