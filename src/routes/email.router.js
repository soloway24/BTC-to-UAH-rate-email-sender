const express = require('express')
const router = express.Router()

const  {
    subscribe,
    sendEmails
} = require('../controllers/email.controller')

router.post('/subscribe', subscribe)
router.post('/sendEmails', sendEmails)

module.exports = router