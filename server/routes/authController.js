const express = require('express')
const authRouter = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const awaitHandlerFactory = middleware => {
    return async (req, res, next) => {
        try {
            await middleware(req, res, next)
        } catch (error) {
            next(error)
        }
    }
}

// api/authentication/signup
authRouter.post('/signup', (req, res) => {
    let data = req.body
    let newUser = new User(data.user)
    newUser.save((error, data) => {
        if (error) {
            console.log('/signup  400 ', error)
            res.status(400).send({ message: error, query: 'signUp', status: 'unsucessful' })
        } else {
            let user = {
                username: data.username,
                id: data.id,
            }
            console.log('/signup  200 ',user)
            res.status(200).send({ user: user, query: 'signUp', status: 'sucessful' })
        }
    })
})


// api/authentication/signin
authRouter.post('/signin', awaitHandlerFactory(async (req, res) => {
    let data = req.body
    let signinUser = new User(data.user)
    await User.findOne({ username: signinUser.username }, (error, user) => {
        if (error) {
            console.log('/signin  520 ', error)
            res.status(520).send({ 
                message: error, 
                query: 'signIn', 
                status: 'unsucessful' 
            })
            return
        }
        if (!user || user === undefined) {
            console.log('/signin  400 ', 'password or username is not correct')
            return res.status(400).send({
                message: 'password/username is not correct',
                query: 'signIn',
                status: 'unsucessful'
            })
        }
        // verify password
        User.validatePassword(user.password, signinUser.password, async (error, isMatch) => {
            if (error) {
                console.log('/signin 400 ', error)
                res.status(400).send({ 
                    message: error, 
                    query: 'signIn', 
                    status: 'unsucessful' })
            }
            if (isMatch) {
                try {
                    // token exists check if token is expired
                    jwt.verify(user.token, 'biubiu')
                    await User.findById(user.id, '-password', (err, data) => {
                        if (err) return res.sendStatus(520)
                        if (data) {
                            // lastModified
                            data.modifyDate = new Date()
                            data.save()
                            console.log('api/signin 200 ')
                            return res.status(200).send({ 
                                user: data, 
                                query: 'signIn', 
                                status: 'sucessful' })
                        }
                    })
                } catch (error) {
                    // token is expire generate token
                    if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
                        const usrJson = User.toAuthJSON(user, true)
                        await User.findById(user.id, '-password', (err, data) => {
                            if (err) return res.sendStatus(520)
                            if (data) {
                                data.token = usrJson.token
                                data.save()
                                console.log('api/signin 200 token refresh')
                                res.status(200).send({ 
                                    user: usrJson, 
                                    query: 'signIn', 
                                    status: 'sucessful' })
                            }
                        })
                    } else {
                        console.log('/signin 400 ', error)
                        res.status(400).send({ 
                            message: error, 
                            query: 'signIn', 
                            status: 'unsucessful' })
                    }
                }
            } else {
                console.log('/signin 403 ')
                res.status(403).send({
                    query: 'signIn',
                    status: 'unsucessful',
                    message: 'username/password is not correct'
                })
            }
        })
    })
}))


// api/authentication/signout
authRouter.delete('/signout', verifyToken, (req, res) => {
    User.findByIdAndUpdate(req.userid, { 'token': '' }, { useFindAndModify: false }, (error) => {
        if (error) {
            console.log('/signout 520', error)
            res.status(520).send({ query: 'signOut', message: error })
        } else {
            console.log('/signout 200')
            res.status(200).send({ query: 'signOut', message: "sucessful" })
        }
    })
})


function verifyToken(req, res, next) {
    // verify the Json Token
    if (!req.headers.authorization) {
        console.log('verifyToken 401 ', 'Unauthorized request')
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        console.log('verifyToken  401 ', 'Unauthorized request')
        return res.status(401).send('Unauthorized request')
    }
    try {
        let payload = jwt.verify(token, 'biubiu')
        req.username = payload.username
        req.userid = payload.id
    } catch (error) {
        console.log('verifyToken 401 ', 'Unauthorized request')
        return res.status(401).send({ error: error })
    }
    next()
}

module.exports = authRouter