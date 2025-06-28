const db = require('../db');
const path = require('path');
const fs = require('fs');

exports.downloadDocument = (req, res) => {
	const id = req.params.id;

	const sql =
		'SELECT  filename, filepath FROM dokuments WHERE id = ? ';

	db.query(sql, [id], (err, result) => {
		if (err)
			return res
				.status(500)
				.json({ message: 'Greska je na serveru' });

		if (result.length === 0)
			return res
				.status(404)
				.json({ message: 'Ne postoji takav fajl u bazi' });

		const { filename, filepath } = result[0];
		const absoluthPath = path.join(__dirname, '..', filepath);

		fs.access(absoluthPath, fs.constants.F_OK, (err) => {
			if (err)
				return res
					.status(404)
					.json({ message: 'fajl ne postoji na serveru' });

			res.download(absoluthPath, filename, (err) => {
				if (err)
					return res
						.status(404)
						.json({ message: 'Greska prilikom preuzimanja' });
			});
		});
	});
};
