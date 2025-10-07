const express = require('express');
const router = express.Router()

const users = require('./UserDataStorage');


router.get('/', (req, res) => { // Renderiza el hbs de registro
    res.render('register')
})

router.post('/', (req, res) => {
    const { name, apellido, date, email, password, confirm_password } = req.body
    const exist = users.find(u => u.email === email)


    if (password !== confirm_password) {
        return res.send('Confirmacion de contraseña incorrecta. Por favor, <a href="/register"> Intentelo nuevamente</a>')
    }
    if (exist) {
        return res.send('Este usuario ya existe <a href="/register"> Volver atras</a>')
    }

    users.push({name, apellido, date, email, password, confirm_password})
    res.redirect('/login')
})

module.exports = router