const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
	res.send('hexaland route up!!!')
})

module.exports = router
