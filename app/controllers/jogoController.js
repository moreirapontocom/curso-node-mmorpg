module.exports.jogo = function(req, res) {

    if (!req.session.autenticado) {
        res.send('Usuário precisa fazer login');
        return;
    }

    res.render('jogo');
}