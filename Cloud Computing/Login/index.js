const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const flash = require('req-flash');
const app = express();

const loginRoutes = require('./src/routes/login.js');
const appRoutes = require('./src/routes/app.js');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'looksim',
    name: 'secretName',
    cookie: {
        sameSite: true,
        maxAge: 60000
    },
}))
app.use(flash());

app.set('views',path.join(__dirname,'src/views'));
app.set('view engine', 'ejs');

app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/', appRoutes);

//port server yg dipakai
app.listen(8080, ()=>{
    console.log('Server Berjalan : 8080');
});
