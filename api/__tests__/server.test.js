const request = require('supertest')
const server = require('../server')
const db = require('../data/db-config')
const { items } = require('../data/seeds/04-items')
const { users } = require('../data/seeds/02-users')
const { markets } = require('../data/seeds/03-markets')

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

it('sanity check', () => {
  expect(true).not.toBe(false)
})

describe('server.js', () => {
  it('is the correct testing environment', async () => {
    expect(process.env.NODE_ENV).toBe('testing')
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