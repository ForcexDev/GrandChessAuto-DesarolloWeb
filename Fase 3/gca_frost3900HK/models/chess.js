const mongoose = require('mongoose');

const TableroSchema = new mongoose.Schema({
    movimientos: [{
        pieza: String,
        de: String,
        a: String,
        turno: String
    }],
    tablero: [[String]],
    turno: { type: String, default: 'w' },
    piezasRobadas: { type: Object },
    public: { type: Boolean, default: false },

    // NUEVOS CAMPOS:
    creador: { type: String, required: true },
    fechaCreacion: { type: Date, default: Date.now }
});

const Tablero = mongoose.model('Tablero', TableroSchema);
module.exports = Tablero;