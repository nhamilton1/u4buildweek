const db = require('../data/db-config')

const getAll = () => db('markets')

const add = async (market) => {
    const [newMarketObject] = await db('markets').insert(market, ['market_id', 'market_name', 'user_id'])
    return newMarketObject
}

module.exports = {
    getAll,
    add
}