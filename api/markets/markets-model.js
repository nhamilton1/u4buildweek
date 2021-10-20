const db = require('../data/db-config')

const findAll = () => {
    return db('markets as m')
        .leftJoin('users as u', 'u.user_id', 'm.user_id')
        .select('u.username', 'm.market_name', 'm.market_id')
}

function findBy(filter) {
    return db('markets as m')
        .leftJoin('users as u', 'u.user_id', 'm.user_id')
        .select('u.username', 'm.market_name', 'm.market_id')
        .where('market_name', filter)
}

const findById = async (market_id) => {
    const rows = await db('markets as m')
        .leftJoin('users as u', 'u.user_id', 'm.user_id')
        .leftJoin('items as i', 'i.market_id', 'm.market_id')
        .select(
            'm.market_id',
            'm.market_name',
            'u.username',
            'i.item_id',
            'i.item_name',
            'i.item_description',
            'i.item_price',
        )
        .where('m.market_id', market_id)

    if (rows.length === 0) {
        return undefined
    } else {
        const market_items = {
            username: rows[0].username,
            market_name: rows[0].market_name,
            market_id: rows[0].market_id,
            items: rows[0].item_id
                ?
                rows.map(item => ({
                    item_id: item.item_id,
                    item_name: item.item_name,
                    item_description: item.item_description,
                    item_price: item.item_price
                })) : []
        }
        return market_items
    }

}

const findMarketByUserId = async (user_id) => {
    return db('markets as m')
    .leftJoin('users as u', 'u.user_id', 'm.user_id')
    .select('u.username', 'm.market_name', 'm.market_id')
    .where('u.user_id', user_id)
    .first()
}


const add = async (market) => {
    const [newMarketObject] = await db('markets').insert(market, ['market_id', 'market_name', 'user_id'])
    return newMarketObject
}

module.exports = {
    findAll,
    add,
    findById,
    findBy,
    findMarketByUserId,
}