const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    country: {
        type: String,
        required: true,
        unique: true,
    },
    capitalCity: {
        type: String,
        required: true,
    }
});

module.exports = citySchema;