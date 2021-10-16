const bcrypt = require('bcrypt')

const password = '123'

const hash = bcrypt.hashSync(password, 8)

const users = [
  { username: 'Test', password: hash },
  { username: 'Bob', password: hash },
  { username: 'Neil', password: hash },
  { username: 'Matt', password: hash },
  { username: 'Rob', password: hash }
]


exports.seed = function (knex) {
  return knex('users').insert(users)
};
