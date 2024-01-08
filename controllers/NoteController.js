const Note = require("../models/note");
const Color = require('../models/color');

exports.getNotes = (req, res, next) => {    
    Note.find({ userId: req.session.user._id })
        .populate('userId')
        .populate({ path: 'colorId', select: 'name hex' })
        .then(notes => {
            res.json({ notes });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error'); 
        })
}

exports.storeNote = (req, res, next) => {    
    const title = req.body.title;
    const thumbnailUrl = req.body.thumbnail;
    const content = req.body.content;
    const color = req.body.color;
        
    const note = new Note({
        title,
        thumbnailUrl,
        content,
        userId: req.session.user,
        colorId: color
    });

    note.save()
        .then(result => {            
            res.json({ response: 'created' });
        })
        .catch(err => {
            console.log(err);
        })
}

exports.editNote = (req, res, next) => {
    const noteId = req.body.noteId;
    const noteTitle = req.body.title;
    const noteContent = req.body.content;
    const color = req.body.color;

    Note.findById(noteId)
        .then(note => {
            if (note.userId.toString() !== req.session.user._id.toString()) {
                return res.redirect('/');
            }
            note.title = noteTitle;
            note.content = noteContent;
            note.colorId = color;
            return note.save();
        })
        .then(result => {
            console.log('The note has been updated!');
            res.json({ response: 'updated' });
        }) 
        .catch(err => console.log(err));
}

exports.deleteNote = (req, res, next) => {
    const noteId = req.body.noteId;
    Note.deleteOne({ _id: noteId, userId: req.session.user._id })
        .then(() => {
            res.json({ response: 'deleted' })
        })
        .catch(err => console.log(err))
}

exports.getColors = (req, res, next) => {
    Color.find()
        .then(colors => {
            res.json({ colors });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        })
}