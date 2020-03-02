const mongoose = require('mongoose')
const Schema = mongoose.Schema

const clientSchema = Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String}
})

const Client = mongoose.model('Client', clientSchema)

module.exports = Client
