exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('user_id')
      users.string('username', 200).notNullable().unique()
      users.string('password', 200).notNullable()
      users.timestamps(false, true)
    })

    .createTable('items', items => {
      items.increments('item_id')
      items.string('item_name', 64).notNullable()
      items.string('item_description', 300)
      items.decimal('item_price').notNullable()
    })

    .createTable('markets', markets => {
      markets.increments('market_id')
      markets.string('market_name').notNullable().unique()
    })

}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('markets')
  await knex.schema.dropTableIfExists('items')
  await knex.schema.dropTableIfExists('users')
}
