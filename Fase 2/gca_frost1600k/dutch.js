const express = require('express');
const { engine } = require('express-handlebars');
const cookieParser = require('cookie-parser')
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser')
const port = 3000;            // Hasta aqui llega la importacion de librerias

app.engine('handlebars', engine({  // config. de handlebars
    layoutsDir: './views/layouts',
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')
app.set('views', './views/layouts')
app.use(express.static('public'))

app.use(session({
    secret: 'secret_passcode_343',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error("Error al cerrar sesión:", err);
            return res.redirect('/home');
        }
        res.redirect('/login');
    });
});

app.use(cookieParser())
app.get('/', (req, res) => {
    res.redirect('/login')
})
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true })) // wea que nose que hace pero es pa los formularios


const loginRouter = require('./plans/login');    // configuracion de routers y su comando de uso
const registerRouter = require('./plans/register');
const homeRouter = require('./plans/home');
const playstationRouter = require('./plans/playstation');
const profileRouter = require('./plans/profile');
const rulesRouter = require('./plans/rules');
const aboutRouter = require('./plans/about');

app.listen(port, () => {
    console.log(`App listening on port:${3000}`)
})

app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/home', homeRouter);
app.use('/playstation', playstationRouter);
app.use('/profile', profileRouter);
app.use('/rules', rulesRouter);
app.use('/about', aboutRouter);

    