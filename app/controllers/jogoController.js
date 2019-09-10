module.exports.jogo = function(application, req, res) {

    if (!req.session.autenticado) {
        res.send('Usuário precisa fazer login');
        return;
    }

    var erro_validacao = 'N';
    if (req.query.erro_validacao=='S')
        erro_validacao = 'S';

    var usuario = req.session.usuario;
    var casa = req.session.casa;

    var connection = application.config.db;
    var JogoModel = new application.models.JogoModel(connection);
    JogoModel.iniciaJogo(usuario, casa, res, erro_validacao);

    // Está dentro do JogoModel.iniciaJogo() porém não deve ser assim. Está assim pois lá dentro deveria retornar uma Promise()
    // res.render('jogo', { img_casa: req.session.casa });
}

module.exports.suditos = function(application, req, res) {
    if (!req.session.autenticado) {
        res.send('Usuário precisa fazer login');
        return;
    }

    res.render('aldeoes', { validation: {} });
}

module.exports.pergaminhos = function(application, req, res) {
    if (!req.session.autenticado) {
        res.send('Usuário precisa fazer login');
        return;
    }

    res.render('pergaminhos', { validation: {} });
}

module.exports.ordenar_acao_suditos = function(req, res) {
    var formData = req.body;

    req.assert('acao', 'Ação é obrigatório').notEmpty();
    req.assert('quantidade', 'Quantidade é obrigatório').notEmpty();

    var errors = req.validationErrors();
    if (errors.length) {
        res.redirect('jogo?erro_validacao=S');
        return;
    }

    res.send('Tudo ok');
}

module.exports.sair = function(req, res) {
    req.session.destroy();
    res.render('index', { validacao: {}, formData: {} });
}