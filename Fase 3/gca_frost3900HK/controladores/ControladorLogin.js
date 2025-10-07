
const Usuario = require('../models/users');
const bcrypt = require('bcrypt')

async function AutenticarUsuario(req, res) { // funcion que hace toda la pega
        const { email, password } = req.body;

        const usuario = await Usuario.findOne({ email }); // busca el email escrito en la base de datos

        if (!usuario) {
            return res.send(`${'Credenciales invalidas, ' + email + ' o ' + password + ' Son incorrectas.'}` + '<a href="/login"> <h1> <--- </h1></a>')
        }
        const password_valida = await bcrypt.compare(password, usuario.password); // uso de bcrypt
        if (!password_valida) {
            return res.send(`${'Credenciales invalidas, ' + email + ' o ' + password + ' Son incorrectas.'}` + '<a href="/login"> <h1> <--- </h1></a>')
        }

    res.cookie('usuario_id', usuario._id.toString(), { // version extendida de las cookies de canvas
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000
    });
    res.cookie('username', usuario.name, {
        maxAge: 24 * 60 * 60 * 1000
    });

        return res.redirect('home'); // linea de meta
}

module.exports = AutenticarUsuario