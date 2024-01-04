const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: false
    }    
}, {timestamps: true});

const Color = mongoose.model('Color', noteSchema);

module.exports = Color;