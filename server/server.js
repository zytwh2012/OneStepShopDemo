const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const timeout = require('connect-timeout')
const path = require('path')
const authApi = require('./routes/authController')
const database = 'mongodb+srv://sososos19:987654321@cluster0-wfs9h.mongodb.net/test?retryWrites=true&w=majority'
const PORT = process.env.PORT || 3000

// init connetction to remote database
mongoose.connect(database, { useNewUrlParser: true }, error => {
  if (error) {
    console.log(error)
  } else {
    console.log('connected to database')
  }
})
app.listen(PORT, function () {
  console.log('server running on localhost' + PORT)
})

// angualr static file
app.use(express.static(path.join(__dirname, './')))
app.use(timeout('10s'))
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }))
app.use(bodyParser.json({ limit: '5mb' }))
app.use(haltOnTimedout)

// add api controllers
app.use('/api/authentication', authApi)

// https://www.npmjs.com/package/connect-timeout
function haltOnTimedout (error, req, res, next) {
  if (error) {
    console.log(error)
    if (error.status) {
      res.status(error.status).send({ message: error.message })
      return
    }
  }
  if (!req.timedout) {
    console.log(JSON.stringify(req.route))
    next()
  } else {
    res.status(508).send({ message: 'timeout!' })
  }
}