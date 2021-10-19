const markets = [
  {user_id: 1, market_name:"Zaam-Dox"},
  {user_id: 2, market_name:"Solarbreeze"},
  {user_id: 3, market_name:"Stim"},
  {user_id: 4, market_name:"Regrant"},
  {user_id: 5, market_name:"Solarbreeze"},
]

exports.markets = markets

exports.seed = function(knex) {
  return knex('markets').insert(markets)
};
