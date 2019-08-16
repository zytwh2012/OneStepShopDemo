const express = require('express')
const authRouter = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// api/authentication/signup
authRouter.post('/signup', (req, res) => {
    let data = req.body
    let newUser = new User(data.user)
    newUser.save((error, data) => {
      if (error) {
        logger.info('/signup => 400 ', error)
        res.status(400).send({ message: error, query: 'signUp', status: 'unsucessful' })
      } else {
        let user = {
          username: data.username,
          id: data.id,
          createDate: data.createDate
        }
        logger.info('/signup => 200 ')
        res.status(200).send({ user: user, query: 'signUp', status: 'sucessful' })
      }
    })
  })