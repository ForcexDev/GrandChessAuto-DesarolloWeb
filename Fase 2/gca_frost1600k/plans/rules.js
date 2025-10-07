const express = require('express');
const router = express.Router()
const isAuthenticated = require('./IsAuth')

router.get('/', isAuthenticated, (req, res) => {
    res.render('rules')
})

module.exports = router