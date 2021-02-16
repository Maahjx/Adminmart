const express = require('express'); //express
const handlebars = require('express-handlebars'); //express-handlebars
const Handlebars = require('handlebars'); //handlebars
const bodyParser = require('body-parser'); //body-parser
const app = express(); //aplicativo 
const path = require('path'); //path
const flash = require('connect-flash'); //connect flash
const usuario = require('./routes/user'); //end-point externo
const session = require('express-session'); 
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const Usuario = require('./models/usuario'); //modulo banco de dados
const passport = require('passport'); //passport
require ('./config/auth')(passport)

const { json } = require('body-parser');
const { deslogado, logado } = require('./helper/authentication')

//CONFIGURAÇÃO DE SESSAO 
// UMA SESSÃO PARA CADA USUARIO 

app.use(session({
    secret: 'aplicativo',
    resave: true,
    saveUninitialized: true
}));

//CONFIGURA O PASSPORT
app.use(passport.initialize())
app.use(passport.session())


// CONFIGURAÇÃO DO BODY PARSER
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use(flash())  //CONFIGURA O FLASH

//VARIAVEIS DE SUCESSO E ERRO
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.user = req.user || null
    res.locals.error = req.flash("error")
    next()
})

//CONFIGURAÇÃO DO HANDLEBARS
app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    // ...implement newly added insecure prototype access
    handlebars: allowInsecurePrototypeAccess(Handlebars)
    })
);

// CONFIGURANDO ARQUIVOS ESTATICOS
app.use(express.static('public'));

//CONFIGURANDO MIDDLEWARE
app.use((req, res, next) => {
    console.log("Utilizando Middler")
    next();
});

//CONFIGURANDO END-POINTS

app.get('/', logado, (req,res) => {
    res.render('login.handlebars')
})

app.get('/register', logado, (req,res) => {
    res.render('register.handlebars')
})

// CONFIGURANDO O SERVIDOR PARA UTILIZAR A ROTA EXTERNA
app.get
app.use('/user', usuario)

// SERVIDOR RODANDO!!!!!!!!!!!!!
const PORT = process.env.PORT || 8081

app.listen(PORT,() => {
    console.log("sevidor rodando")
})