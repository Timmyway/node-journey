const Note = require("../models/note");

exports.getNotes = (req, res, next) => {
    Note.find()
        .then(notes => {
            res.json({ notes });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        })
}

exports.storeNote = (req, res, next) => {
    console.log('===> STORE note');
    const title = req.body.title;
    const thumbnailUrl = req.body.thumbnail;
    const content = req.body.content;

    console.log('==> Store note backend: ', title, thumbnailUrl, content)
    const note = new Note({
        title,
        thumbnailUrl,
        content
    });

    note
        .save()
        .then(result => {
            console.log('Created a new note');
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

    Note.findById(noteId)
        .then(note => {
            note.title = noteTitle;
            note.content = noteContent;
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
    Note.findByIdAndRemove(noteId)
        .then(() => {
            res.json({ response: 'deleted' })
        })
        .catch(err => console.log(err))
}