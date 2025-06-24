const express = require('express')
const cors = require('cors')
const app = express()
const db = require('./db')


app.use(express.urlencoded({ extended: false}))
app.use(express.json())
app.use(cors())

app.listen(process.env.PORT, () => {
    console.log(`connected on ${process.env.PORT} port 👍🏼`);
    
})