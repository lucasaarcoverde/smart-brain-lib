const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'd2f7dde5e452422bb6f378b96ef6def6'
});

const handleApiCall = () => (req, res) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json("unable to work with API"));
}

const handleImages = (db) => (req, res) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(404).json("Unable to get entries"));
}

module.exports = {
	handleImages: handleImages,
	handleApiCall: handleApiCall
}