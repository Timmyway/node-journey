const express = require('express');

const router = express.Router();

const noteController = require('../controllers/NoteController');

router.post('/api/notes', noteController.storeNote);

module.exports = router;