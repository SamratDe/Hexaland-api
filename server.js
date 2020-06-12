const express = require('express')
const hexalandRoute = require('./routes/api/hexaland')
const connectDB = require('./config/db')

connectDB()

const app = express()
const PORT = process.env.PORT || 3000

app.use('/api/hexaland', hexalandRoute)

app.listen(PORT, () => {
	console.log(`Server up and running on PORT ${PORT}`)
})
