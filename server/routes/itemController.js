const express = require('express')
const itemRouter = express.Router()
const Item = require('../models/item')



const pasrseUrlToQuery = (params) => {
    let query = { select: {}, limit: 100, skip: 0, sort: {} }
    for (var key in params) {
        var value = params[key]
        switch (key) {
            case 'limit':
                query.limit = parseInt(value)
                break
            case 'skip':
                query.skip = parseInt(value)
                break
            case 'sort':
                query.sort = value
                break
            default:
                query.select[key] = value
        }
    }
    return query
}

// get api/items return items by query
itemRouter.get('/', (req, res) => {
    let query = pasrseUrlToQuery(req.query)
    Item.execute(query, (error, data) => {
      if (error) {
        console.log('GET /items => 520 ', error);
        res.status(520).send({ query: 'returnAllItems', message: error })
      } else {
        console.log('GET /items => 200 ')
        res.status(200).send({ items: data, length: data.length, query: 'findAllItems' })
      }
    })
  })

  module.exports = itemRouter