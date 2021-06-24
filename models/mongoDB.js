const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const xoSchema = new Schema({
    result: String,
    position: Array,
    size: Number
})

module.exports = mongoose.model('Replay', xoSchema)