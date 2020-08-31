const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '2007d9744e3244a1a6ed49b941813b3b'
});

const handleApiCall = (req, res) => {
  app.models
    // This part has been updated with the recent Clarifai changed. Used to be:
    // .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then(entries => {
			res.json(entries[0]);
		})
		.catch(err=> res.status(400).json('unable to get user entries'));
}

module.exports = {
	handleImage,
	handleApiCall
}