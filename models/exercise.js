const mongoose = require('mongoose')

const exerciseSchema = new mongoose.Schema({
    name: String,
    description: String,
    video: {type: String, required: false},
    muscleGroup: String,
    isHard: {type: Boolean, default: false}},
    {timestamps: true}
)

const Exercise = mongoose.model('Exercise', exerciseSchema)

module.exports = Exercise
