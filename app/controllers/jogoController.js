module.exports.jogo = function(application, req, res) {

    if (!req.session.autenticado) {
        res.send('Usuário precisa fazer login');
        return;
    }

    var usuario = req.session.usuario;
    var casa = req.session.casa;

    var connection = application.config.db;
    var JogoModel = new application.models.JogoModel(connection);
    JogoModel.iniciaJogo(usuario, casa, res);

    // Está dentro do JogoModel.iniciaJogo() porém não deve ser assim. Está assim pois lá dentro deveria retornar uma Promise()
    // res.render('jogo', { img_casa: req.session.casa });
}

module.exports.sair = function(req, res) {
    req.session.destroy();
    res.render('index', { validacao: {}, formData: {} });
}