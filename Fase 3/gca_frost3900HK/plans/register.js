const express = require('express');
const router = express.Router()
const listarUsuarios = require('../controladores/ControladorUsers'); // importa el controlador para registro (exclusivo)


router.get('/', (req, res) => { // Renderiza el hbs de registro
    res.render('register')
})
router.post('/', async (req, res) => {
    try{  // utiliza try catch
        const { name, apellido, date, email, password, confirm_password } = req.body
        await listarUsuarios(name, apellido, date, email, password, confirm_password); // llama a la funcion y ella hace el resto

        res.redirect('login')
    }
    catch(Error){ // los errores se verifican en la funcion
        return res.send(Error.message + '<a href="/register"> <h1> <--- </h1></a>')
    }

})

module.exports = router