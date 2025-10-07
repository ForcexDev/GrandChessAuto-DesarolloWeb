
const Usuario = require('../models/users');
const bcrypt = require('bcrypt')

async function listarUsuarios(name, apellido, date, email, password, confirm_password) { // funcion que hace casi todo

    if (password !== confirm_password) {
        throw new Error(`${password + ' y ' + confirm_password + ' No coinciden. por favor, intentelo nuevamente'}`);
    }

    const ValidarNombre = await Usuario.findOne({$or: [{name}]}) // busca el nombre escrito por separado
    const ValidarCorreo = await Usuario.findOne({$or: [{email}]}) // lo mismo para el mail

    if (ValidarCorreo) {
        throw new Error(`${'La direccion de correo ' + email + ' ya esta registrada en este sitio. Por favor, intentelo nuevamente'}`);
    }
    else if(ValidarNombre) {
        throw new Error(`${'El nombre de usuario ' + name + ' ya existe. Por favor, intentelo nuevamente'}`);
    }

    const nuevoUsuario = new Usuario({ // guarda los valores usando el esquema
        name,
        apellido,
        date: new Date(date),
        email,
        password,
        confirm_password
    });
    await nuevoUsuario.save(); // lo mete a la base de datos
    return nuevoUsuario; // linea de meta
}

module.exports = listarUsuarios;