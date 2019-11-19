const mongoose = require('mongoose');

const urlSchema = mongoose.Schema({
    original_url: String,
    short_url: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Urls', urlSchema);