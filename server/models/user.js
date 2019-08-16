const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
const SALT_WORK_FACTOR = 999
const jwt = require('jsonwebtoken')

var userSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    address: { type: Object, required: true },
    createDate: { type: Date, default: Date.now },
    modifyDate: { type: Date, default: Date.now },
    token: { type: String, default: '' },
})


userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    // remove the _id of every document before returning the result
    transform: function (doc, ret) { delete ret._id }
})

// generate and refresh token 
userSchema.statics.toAuthJSON = function (user, generateToken) {
    var token = null
    const today = new Date()
    if (generateToken) {
        var expirationDate = new Date()
        // valid for a month
        expirationDate.setDate(today.getDate() + 30)

        token = jwt.sign({
            id: user.id,
            username: user.username,
            email: user.email,
            acess: parseInt(expirationDate.getTime() / 1000, 10)
        }, 'biubiu')
    }
    user.modifyDate = today
    user.token = token || user.token
    return user
}

// https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
userSchema.statics.generateHashPassword = function (password, callback) {
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
      if (err) return callback(err)
      // hash the password along with our new salt
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) return callback(err)
        // override the cleartext password with the hashed one
        return callback(null, hash)
      })
    })
  }
  
// https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
userSchema.statics.validatePassword = function (userPassword, candidatePassword, callback) {
    bcrypt.compare(candidatePassword, userPassword, (error, isMatch) => {
      if (error) return callback(error)
      callback(null, isMatch)
    })
  }

// https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
userSchema.pre('save', function (next) {
    var user = this
    user.modifyDate = Date.now()
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next()
    // hash the password along with our new salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
      if (err) return next(err)
      // hash the password along with our new salt
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err)
        // override the cleartext password with the hashed one
        user.password = hash
        next()
      })
    })
  })
  
  module.exports = mongoose.model('user', userSchema, 'users')