const mongoose = require('./mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const gameSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Name Required"],
        minlength: [1, "Please have more than 1 character"],
        unique: [true, "This user name already exists"]
    },
    score: {
        type: Number,
        default: 0
    }

}, { timestamps: true })

gameSchema.plugin(uniqueValidator, { message: "Game name already exists in the system" });

module.exports = mongoose.model('Game', gameSchema);