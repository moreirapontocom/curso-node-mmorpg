module.exports.jogo = function(application, req, res) {

    if (!req.session.autenticado) {
        res.send('Usuário precisa fazer login');
        return;
    }

    // Essa parte aqui ficou gambiarrada mas tudo bem, como não vou usar Node no frontend, deixa como está e boas.
    var erro_validacao = 'N';
    if (req.query.erro_validacao=='S')
        erro_validacao = 'S';

    if (req.query.erro_validacao=='success')
        erro_validacao = 'success';

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

    var connection = application.config.db;
    var JogoModel = new application.models.JogoModel(connection);

    JogoModel.getAcoes(req.session.usuario, res);

    // res.render('pergaminhos', { validation: {} });
}

module.exports.ordenar_acao_suditos = function(application, req, res) {
    var formData = req.body;

    req.assert('acao', 'Ação é obrigatório').notEmpty();
    req.assert('quantidade', 'Quantidade é obrigatório').notEmpty();

    var errors = req.validationErrors();
    if (errors.length) {
        res.redirect('jogo?erro_validacao=S');
        return;
    }

    var connection = application.config.db;
    var JogoModel = new application.models.JogoModel(connection);

    formData.usuario = req.session.usuario;
    JogoModel.acao(formData, res);

    // res.send('Tudo ok');
}

module.exports.sair = function(req, res) {
    req.session.destroy();
    res.render('index', { validacao: {}, formData: {} });
}