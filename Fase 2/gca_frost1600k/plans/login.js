const express = require('express');
const cookieParser = require('cookie-parser')
const router = express.Router()
const users = require('./UserDataStorage');
router.use(cookieParser())


router.get('/', (req, res) => {
    res.render('login')
})

router.post('/',(req, res) => {
    const { email, password } = req.body
    const auth = users.find(u => u.email === email && u.password === password)

    if (!auth) {
        return res.send('Credenciales inválidas <a href="/login"> volver atras</a>')
    }

    req.session.user = {
        email: auth.email,
        name: auth.name
    };
    res.redirect('/home')
})


module.exports = router