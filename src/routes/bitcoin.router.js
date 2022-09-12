const express = require('express')
const router = express.Router()

const  {
    getRateInUAH,
} = require('../controllers/bitcoin.controller')

router.get('/rate', getRateInUAH)

module.exports = router