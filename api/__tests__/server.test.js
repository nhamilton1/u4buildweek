const request = require('supertest')
const server = require('../server')
const db = require('../data/db-config')
const jwt_decoded = require('jwt-decode')
const { users } = require('../data/seeds/02-users')
const { markets } = require('../data/seeds/03-markets')
const { items } = require('../data/seeds/04-items')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db.seed.run()
})
afterAll(async () => {
  await db.destroy()
})


describe('[POST] /api/auth/register', () => {

  let res
  beforeEach(async () => {
    res = await request(server).post('/api/auth/register').send({
      username: 'testing',
      password: '123'
    })
  })

  test('responds with 201', async () => {
    expect(res.status).toBe(201)
  })

  test('should contain newly created user', async () => {
    const bob = await db('users')
    expect(bob).toHaveLength(6)
  })

})

describe('[POST] /api/auth/login', () => {
  let res
  beforeEach(async () => {
    res = await request(server).post('/api/auth/login').send({
      username: 'Test',
      password: '123'
    })
  })

  test('responds with the correct message on invalid credentials', async () => {
    const res = await request(server).post('/api/auth/login').send({ username: 'Bob', password: '1234' })
    expect(res.body.message).toMatch(/invalid credentials/i)
  })

  test('should give welcome message', async () => {
    expect(res.body.message).toContain("Welcome, Test")
  })

  test('responds with a token', async () => {
    let decoded = jwt_decoded(res.body.token)
    expect(decoded).toHaveProperty('exp')
    expect(decoded).toHaveProperty('iat')
  })
})

describe('[GET] /users', () => {
  let res
  beforeEach(async () => {
    res = await request(server).get('/api/users')
  })

  test('responds with 200', async () => {
    expect(res.status).toBe(200)
  })

  test('can get the correct number of users', async () => {
    expect(res.body).toHaveLength(users.length)
  })

})

describe('[GET] /users/:id', () => {

  test('responds with 200', async () => {
    let res = await request(server).get('/api/users/1')
    expect(res.status).toBe(200)
  })

  test('can get the correct user', async () => {
    let res = await request(server).get('/api/users/1')
    expect(res.body).toMatchObject({ user_id: 1, username: "Test" })
  })

  test('error message if no user found', async () => {
    let res = await request(server).get('/api/users/2222')
    expect(res.body).toMatchObject({ message: 'User 2222 does not exist', status: 404 })
  })

})


describe('[GET] /markets', () => {
  let res
  beforeEach(async () => {
    res = await request(server).get('/api/markets')
  })

  test('responds with 200', async () => {
    expect(res.status).toBe(200)
  })

  test('can get the correct number of markets', async () => {
    expect(res.body).toHaveLength(markets.length)
  })

})

describe('[GET] /items', () => {
  let res
  beforeEach(async () => {
    res = await request(server).get('/api/items')
  })

  test('responds with 200', async () => {
    expect(res.status).toBe(200)
  })

  test('can get the correct number of items', async () => {
    expect(res.body).toHaveLength(items.length)
  })

})

describe('[GET] /items/:id', () => {

  test('responds with 200', async () => {
    let res = await request(server).get('/api/items/1')
    expect(res.status).toBe(200)
  })

  test('can get the correct user', async () => {
    let res = await request(server).get('/api/items/1')
    expect(res.body).toMatchObject({
      item_description: "Nulla justo.",
      item_id: 1,
      item_name: "Beans - Butter Lrg Lima",
      item_price: "10.38",
      market_id: 1
    })
  })

  test('error message if no user found', async () => {
    let res = await request(server).get('/api/items/2222')
    expect(res.body).toMatchObject({ message: 'Item 2222 does not exist', status: 404 })
  })

})


describe('[GET] /markets/:id', () => {

  test('responds with 200', async () => {
    let res = await request(server).get('/api/markets/1')
    expect(res.status).toBe(200)
  })

  test('can get the correct market', async () => {
    let res = await request(server).get('/api/markets/1')
    expect(res.body).toMatchObject({
      items: [
        {
          item_description: "Nulla justo.",
          item_id: 1,
          item_name: "Beans - Butter Lrg Lima",
          item_price: "10.38"
        },
        {
          item_description: "Proin eu mi. Nulla ac enim.",
          item_id: 2,
          item_name: "Chutney Sauce",
          item_price: "38.27"
        },
        {
          item_description: "Nunc purus. Phasellus in felis.",
          item_id: 3,
          item_name: "Appetizer - Mango Chevre",
          item_price: "30.84"
        },
        {
          item_description: "In quis justo. Maecenas rhoncus aliquam lacus.",
          item_id: 40,
          item_name: "Grapefruit - Pink",
          item_price: "3.99"
        },
        {
          item_description: "In congue.",
          item_id: 41,
          item_name: "Glycerine",
          item_price: "21.43"
        },
        {
          item_description: "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat.",
          item_id: 43,
          item_name: "Milkettes - 2%",
          item_price: "31.28"
        },
        {
          item_description: "In eleifend quam a odio.",
          item_id: 45,
          item_name: "Plasticforkblack",
          item_price: "38.01"
        },
        {
          item_description: "Vestibulum sed magna at nunc commodo placerat.",
          item_id: 47,
          item_name: "Yogurt - Strawberry, 175 Gr",
          item_price: "12.65"
        }
      ],
      market_id: 1,
      market_name: "Zaam-Dox",
      username: "Test"
    })
  })

  test('error message if no user found', async () => {
    let res = await request(server).get('/api/markets/2222')
    expect(res.body).toMatchObject({ message: "Cannot read properties of undefined (reading 'username')" })
  })

})

describe('[POST] /api/markets', () => {

  test('responds a newly created market', async () => {
    await request(server).post('/api/auth/register').send({ username: 'bobe', password: '1234' })
    let res = await request(server).post('/api/auth/login').send({ username: 'bobe', password: '1234' })
    res = await request(server).post('/api/markets').set('Authorization', res.body.token).send({ market_name: 'testing' })
    expect(res.body).toMatchObject({ market_id: 6, market_name: "testing", user_id: 6 })

  })

  test('should contain the correct number of markets', async () => {
    await request(server).post('/api/auth/register').send({ username: 'bobe', password: '1234' })
    let res = await request(server).post('/api/auth/login').send({ username: 'bobe', password: '1234' })
    await request(server).post('/api/markets').set('Authorization', res.body.token).send({ market_name: 'testing' })
    const testing = await db('markets')
    expect(testing).toHaveLength(6)
  })

})

describe('[POST] /api/items', () => {

  test('must have a market to post a new item', async () => {
    await request(server).post('/api/auth/register').send({ username: 'bobe', password: '1234' })
    let res = await request(server).post('/api/auth/login').send({ username: 'bobe', password: '1234' })
    res = await request(server).post('/api/items').set('Authorization', res.body.token).send({ item_name: 'Sushi', item_description: 'Tuna Roll', item_price: 6, })
    expect(res.body).toMatchObject({ message: 'bobe does not have a market, you need a market to post an item.', status: 404 })
  })

  test('responds a newly created item', async () => {
    await request(server).post('/api/auth/register').send({ username: 'bobe', password: '1234' })
    let res = await request(server).post('/api/auth/login').send({ username: 'bobe', password: '1234' })
    await request(server).post('/api/markets').set('Authorization', res.body.token).send({ market_name: 'testing' })
    res = await request(server).post('/api/items').set('Authorization', res.body.token).send({ item_name: 'Sushi', item_description: 'Tuna Roll', item_price: 6, })
    expect(res.body).toMatchObject({ item_name: 'Sushi', item_description: 'Tuna Roll', item_price: "6.00", })
  })

  test('should contain the correct number of items', async () => {
    await request(server).post('/api/auth/register').send({ username: 'bobe', password: '1234' })
    let res = await request(server).post('/api/auth/login').send({ username: 'bobe', password: '1234' })
    await request(server).post('/api/markets').set('Authorization', res.body.token).send({ market_name: 'testing' })
    await request(server).post('/api/items').set('Authorization', res.body.token).send({ item_name: 'Sushi', item_description: 'Tuna Roll', item_price: 6, })
    const testing = await db('items')
    expect(testing).toHaveLength(49)
  })

})