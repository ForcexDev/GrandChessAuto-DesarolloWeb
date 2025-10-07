const express = require('express');
const router = express.Router()

router.get('/', (req, res) => {
    const username = req.cookies.username
    if (!username) return res.redirect('/login')

    res.render('home')
})

module.exports = router