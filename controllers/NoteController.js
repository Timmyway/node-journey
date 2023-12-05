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