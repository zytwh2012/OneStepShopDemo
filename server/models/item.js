const mongoose = require('mongoose')
const Schema = mongoose.Schema

var itemSchema = new Schema({
    name: { type: String, required: true, index: { unique: true } },
    description: { type: String, required: true },
    img: { type: String, required: true },
    price: { type: String, required: true },
    category: { type: String, required: true },
})

// https://stackoverflow.com/questions/7034848/mongodb-output-id-instead-of-id
itemSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})

itemSchema.statics.execute = function (query, callback) {
    return this.find(query.select).skip(query.skip).limit(query.limit).sort(query.sort).exec(callback)
}

module.exports = mongoose.model('item', itemSchema, 'items')