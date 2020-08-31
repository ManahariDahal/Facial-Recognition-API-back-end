const handleProfileGet = (req, res, db) => {
	const { id } = req.params;
	// let found = false;
	db.select('*').from('users').where({
		id: id
	}).then(user => {
		if(user.length) {
			res.json(user[0]);
		} 
		else {
			res.status(404).json('Not found')
		}
		
	})
	.catch(err => {
		res.status(400).json('Error getting user')
	})
	// if (!found) {
	// 	res.status(404).json('not found');
	// }
}

module.exports = {
	handleProfileGet: handleProfileGet
}