const express = require('express');
const Usuario = require('../models/usuario');
const routes = express.Router();
const passport = require('passport');
const {deslogado} = require('../helper/authentication')

routes.get('/dashboard', deslogado, (req, res) => {
    res.render('usuario/index.handlebars');
});

routes.get('/profile', deslogado, (req,res)=>{
    console.log(req.user)
    res.render('usuario/profile.handlebars')
})

routes.post('/login', (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: '/user/dashboard',
        failureRedirect: '/',
        failureFlash: true
    })(req, res, next)
})

routes.get('/logout', (req, res) => {
    req.logout()
    req.flash("success_msg", "Deslogado com sucesso")
    res.redirect('/')
})

routes.post('/register', (req, res) => {
    let erros = []

    if (!req.body.userName || typeof req.body.userName == undefined || req.body.userName == null) {
        erros.push({ texto: "Nome esta incorreto" })
    }

    if (!req.body.userEmail || typeof req.body.userEmail == undefined || req.body.userEmail == null) {
        erros.push({ texto: "E-mail está incorreto" })
    }

    if (!req.body.userPassword || typeof req.body.userPassword == undefined || req.body.userPassword == null) {
        erros.push({ texto: "Senha invalida" })
    }

    if (req.body.userPassword.length < 8) {
        erros.push({ texto: "Senha tem que ter 8 caracteres" })
    }

    if (req.body.userPassword != req.body.confirmPassword) {
        erros.push({ texto: "Senhas não coincidem" })
    }

    if (erros.length > 0) {
        res.render('register.handlebars', { erros: erros })
    } else {
        Usuario.findOne({ where: { emailUsuario: req.body.userEmail } }).then((usuario) => {
            if(usuario){
                console.log("Usuario já exite na base de dados")
                req.flash('error_msg', "Email já está sendo usado!")
                res.redirect('/register')
            }else{
                Usuario.create({
                    nomeUsuario: req.body.userName,
                    emailUsuario: req.body.userEmail,
                    senhaUsuario: req.body.userPassword
                }).then(() => {
                    console.log("Usuario cadastrado com sucesso!")
                    req.flash('sucess_msg', "Usuario cadastrado com sucesso")
                    res.redirect('/')
                }).catch((err) => {
                    console.log(err)
                })
            }
        }).catch((err) => {
            console.log(err)
        })
    }
})

module.exports = routes