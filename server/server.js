const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000

app.use(bodyParser.json({ limit: '5mb' }))

app.listen(PORT, function () {
    console.log('server running on localhost' + PORT)
  })