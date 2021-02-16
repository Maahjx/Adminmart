module.exports = {
    deslogado: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next()
        }
        req.flash('error_msg', 'Você precisa estar Logado !')
        res.redirect('/');
    },

    logado: (req, res, next) => {
        if (req.isAuthenticated()) {
            req.flash('error_msg', 'Você ja esta logado')
            res.redirect('/usuario/dashboard');
        }
        return next()
    },
}