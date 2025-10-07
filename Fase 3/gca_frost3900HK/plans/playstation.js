const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const Tablero = require('../models/chess');
const { CrearTablero, GetTablero } = require('../controladores/ControladorTablero');

// Ruta raíz de playstation
router.get('/', (req, res) => {
    const username = req.cookies.username;
    if (!username) return res.redirect('/login');

    res.render('playstation');
});

// Crear nueva partida (pública o privada)
router.get('/crear', async (req, res) => {
    const type = req.query.type === 'true' ? true : false;
    const username = req.cookies.username;
    if (!username) return res.status(401).send("No autenticado");

    const id = await CrearTablero(type, username);
    res.send(String(id._id));
});

// Ver partida (uso interno/API)
router.get('/ver/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const tablero = await GetTablero(id);
        if (!tablero) return res.status(404).send("Partida no encontrada");
        res.send(tablero);
    } catch (error) {
        res.status(500).send("Error al obtener la partida");
    }
});

// Eliminar partida (solo si la creó el usuario)
router.delete('/eliminar/:id', async (req, res) => {
    const username = req.cookies.username;
    if (!username) return res.status(401).send("No autenticado");

    const id = req.params.id;
    try {
        const partida = await Tablero.findById(id);
        if (!partida) return res.status(404).send("Partida no encontrada");

        if (partida.creador !== username) return res.status(403).send("No autorizado");

        await Tablero.deleteOne({ _id: new ObjectId(id) });
        res.send("Partida eliminada");
    } catch (err) {
        res.status(500).send("Error al eliminar partida: " + err.message);
    }
});

// Ruta para mostrar el tablero de una partida específica
router.get('/:id', async (req, res) => {
    const username = req.cookies.username;
    const id = req.params.id;

    if (!username) return res.redirect('/home');

    const tablero = await GetTablero(id);
    if (!tablero) return res.redirect('/home');

    res.render('playstation', {
        username,
        idPartida: id
    });
});

router.post('/mover', async (req, res) => {
    const { id, pieza, de, a, turno, tablero } = req.body;

    if (!id || !pieza || !de || !a || !turno || !tablero) {
        return res.status(400).send("Faltan datos para guardar el movimiento.");
    }

    try {
        const partida = await Tablero.findById(id);
        if (!partida) return res.status(404).send("Partida no encontrada");

        partida.movimientos.push({
            pieza,
            de,
            a,
            turno
        });

        partida.tablero = tablero;
        await partida.save();

        res.send("Movimiento guardado correctamente");
    } catch (error) {
        console.error("Error al guardar movimiento:", error);
        res.status(500).send("Error del servidor");
    }
});


module.exports = router;
