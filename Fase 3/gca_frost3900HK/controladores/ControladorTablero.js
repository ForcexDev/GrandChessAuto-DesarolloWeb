const Tablero = require('../models/chess');

const CrearTablero = async (type, creador) => {
    const tableroInicial = [
        ["b_rook", "b_knight", "b_bishop", "b_queen", "b_king", "b_bishop", "b_knight", "b_rook"],
        ["b_pawn", "b_pawn", "b_pawn", "b_pawn", "b_pawn", "b_pawn", "b_pawn", "b_pawn"],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["w_pawn", "w_pawn", "w_pawn", "w_pawn", "w_pawn", "w_pawn", "w_pawn", "w_pawn"],
        ["w_rook", "w_knight", "w_bishop", "w_queen", "w_king", "w_bishop", "w_knight", "w_rook"]
    ];

    const partida = new Tablero({
        tablero: tableroInicial,
        turno: 'w',
        public: type,
        movimientos: [],
        creador: creador,
        fechaCreacion: new Date()
    });

    await partida.save();
    return partida;
};

const GetTablero = async (id) => {
    const partida = await Tablero.findById(id);
    return partida;
};

module.exports = {
    CrearTablero,
    GetTablero
};
