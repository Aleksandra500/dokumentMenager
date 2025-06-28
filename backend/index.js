const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');
const path = require('path');
const postRoutes = require('./routes/postRoutes');
const downloadRoute = require('./routes/downloadRoute')

require('dotenv').config();

console.log('Pokrećem Express server...');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/post', postRoutes);
app.use('/api/download', downloadRoute )

app.listen(process.env.PORT, () => {
	console.log(`connected on ${process.env.PORT} port 👍🏼`);
});
