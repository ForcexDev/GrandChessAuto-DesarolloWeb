const express = require('express');
const cookieParser = require('cookie-parser')
const router = express.Router()
router.use(cookieParser());
const AutenticarUsuario = require("../controladores/ControladorLogin"); // Importa el controlador para el login (exclusivo)


router.get('/', (req, res) => {
    res.render('login')
})

router.post('/', AutenticarUsuario); // Esto queda vacio porque toda la operacion se quedo en el controlador


module.exports = router