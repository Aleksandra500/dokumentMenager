const db = require('../db');

exports.uploadDocument = (req, res) => {
	const { title, description } = req.body;
	const { filename, path } = req.file;
	console.log(req.body);
	console.log(req.body.title);
	console.log(req.body.description);
	console.log(req.file);
	console.log(req.file.filename);
	console.log(req.file.path);

	const sql =
		'INSERT INTO dokuments (title, description, filename, filepath) VALUES (?, ?, ?, ?)';
	const values = [title, description, filename, path];

	db.query(sql, values, (err, result) => {
		if (err) {
			console.error('❌ Greška pri upisu u bazu:', err);
			return res
				.status(500)
				.json({ status: 'err', message: 'Greška iz servisa' });
		}

		return res.status(200).json({
			status: 'success',
			message: '✅ Uspešno upisano u bazu!',
		});
	});
};

exports.getAll = (req, res) => {
	
	const sql = 'SELECT * FROM dokuments'

	db.query(sql, (err, result) => {
		if(err){
			return  res.status(500).json({
				status: err,
				message: 'Greska iz servisa'
			})
		}
		return res.status(200).json({
			status: 'success',
			message: 'Izlistana je lista dokumenata',
			result: result
		})
	})
}
