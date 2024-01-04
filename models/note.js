const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    imageThumbnail: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: true
    },
    colorId: {
        type: Schema.Types.ObjectId,
        ref: 'Color',
        required: false
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    }
}, {timestamps: true});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;