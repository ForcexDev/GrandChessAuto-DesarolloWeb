
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UsuarioSchema = new mongoose.Schema({ // Esquema de usuario. define la estructura
    name: { type: String},
    apellido: { type: String},
    date: { type: Date},
    email: { type: String},
    password: { type: String},
    confirm_password: { type: String}
});

UsuarioSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        try {
            this.password = await bcrypt.hash(this.password, 10);
            this.confirm_password = undefined;
        } catch (error) {
            return next(error);
        }
    }
    next();
});

const Usuario = mongoose.model('Usuario', UsuarioSchema)

module.exports = Usuario