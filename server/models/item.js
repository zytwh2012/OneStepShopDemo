const mongoose = require('mongoose')
const Schema = mongoose.Schema

var itemSchema = new Schema({
    name: { type: String, required: true, index: { unique: true } },
    description: { type: String, required: true },
    img: { type: String, required: true },
    price: { type: String, required: true },
    category: { type: String, required: true },
})