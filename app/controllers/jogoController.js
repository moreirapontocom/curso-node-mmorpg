module.exports.jogo = function(req, res) {

    if (!req.session.autenticado) {
        res.send('Usuário precisa fazer login');
        return;
    }

    res.render('jogo', { img_casa: req.session.casa });
}

module.exports.sair = function(req, res) {
    req.session.destroy();
    res.render('index', { validacao: {}, formData: {} });
}