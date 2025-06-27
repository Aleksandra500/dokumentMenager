const { log } = require('console');
const db = require('../db');
const path = require('path');
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
	const sql = 'SELECT * FROM dokuments';

	db.query(sql, (err, result) => {
		if (err) {
			return res.status(500).json({
				status: err,
				message: 'Greska iz servisa',
			});
		}
		return res.status(200).json({
			status: 'success',
			message: 'Izlistana je lista dokumenata',
			result: result,
		});
	});
};

exports.deleteOne = (req, res) => {
  const id = req.params.id;
  console.log(id, 'id')

  const getFileSql = 'SELECT filepath FROM dokuments WHERE id = ?';
  db.query(getFileSql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Greška na serveru' });
    }

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: 'Nije pronađen nijedan dokument' });
    }

    const filePath = result[0].filepath;

    fs.unlink(path.join(__dirname, '..', filePath), (err) => {
      if (err) {
        console.log('Greška prilikom brisanja fajla:', err);
        // Ako želiš, možeš vratiti grešku, ili nastaviti i obrisati samo iz baze
        return res.status(500).json({ success: false, message: 'Greška pri brisanju fajla' });
      }

      const sql = 'DELETE FROM dokuments WHERE id = ?';
      db.query(sql, [id], (err, result) => {
        if (err) {
          return res.status(500).json({ success: false, message: 'Greška iz servisa' });
        }

        return res.status(200).json({ success: true, message: 'Uspešno obrisano!' });
      });
    });
  });
};
