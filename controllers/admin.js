const Note = require("../models/note");

exports.postAddNote = (req, res, next) => {
    const title = req.body.title;
    const thumbnailUrl = req.body.thumbnailUrl;
    const content = req.body.content;

    const note = new Note({
        title,
        price,
        content
    });

    note
        .save()
        .then(result => {
            console.log('Created a new note');
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        })
}