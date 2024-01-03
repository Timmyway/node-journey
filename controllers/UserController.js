const User = require('../models/user');
const mongoose = require('mongoose');

exports.addUser = (req, res) => {
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;
	bcrypt.hash(password, 12)
	.then((hashedPassword) => {
		const user = new User({
			username: username,
			email: email,
			password: hashedPassword
		});
		user.save()
		.then((result) => {
			res.send(result); 
		})
	});		
}

exports.allUsers = (req, res) => {
	User.find().sort({ createdAt: -1 })
	.then((users) => {
		res.json({ data: users });
	})
}

exports.getUser = (req, res) => {
	const userId = req.params.userId;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({error: 'Invalid userId format'});
    }

	User.findById(userId)
		.then((user) => {
			if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
			res.status(200).json({ user });
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: 'Internal Server Error', msg: err });
		})
}