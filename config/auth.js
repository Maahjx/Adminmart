const localStrategy = require('passport-local').Strategy
const Usuario = require('../models/Usuario')

module.exports = function (passport) {
    passport.use(new localStrategy({ usernameField: "userEmail", passwordField: "userPassword" }, (email, senha, done) => {
        Usuario.findOne({ where: { emailUsuario: email } }).then((usuario) => {
            if (!usuario) {
                console.log("Conta não existe")
                return done(null, false, { message: 'Esta conta não existe' })
            } else {
                console.log(usuario)
                if (!(usuario.senhaUsuario == senha)) {
                    console.log("Senha incorreta")
                    return done(null, false, { message: 'As senhas não correspodem' })
                }
                return done(null, usuario)
            }
        })
    }))

    passport.serializeUser(function (user, done) {
        done(null, user.idUsuarios)
    });

    passport.deserializeUser(function (id, done) {
        Usuario.findOne({ where: { idUsuarios: id } }).then(user => {
            done(null, user)
        }).catch(err => done(err));
    });
}
