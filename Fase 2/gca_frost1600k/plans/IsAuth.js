
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }
    return res.send('No se supone que deberias estar aqui. . .<a href="/login"> <h1> Salir</h1></a>')
};

module.exports = isAuthenticated;