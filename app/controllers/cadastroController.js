module.exports.cadastro = function(req, res) {
    res.render('cadastro', { validacao: {}, formData: {} });
}

module.exports.cadastrar = function(application, req, res) {

    var formData = req.body;

    req.assert('nome','Nome é obrigatório').notEmpty()
    req.assert('usuario','Usuário é obrigatório').notEmpty()
    req.assert('senha','Senha é obrigatório').notEmpty()
    req.assert('casa','Casa é obrigatório').notEmpty()

    var errors = req.validationErrors();
    if (errors) {
        res.render('cadastro', { validacao: errors, formData: formData });
        return;
    }

    var connection = application.config.db;
    var UsuarioModel = new application.models.UsuarioModel(connection);
    var JogoModel = new application.models.JogoModel(connection);

    UsuarioModel.add(formData);
    JogoModel.gerarParametros(formData.usuario);

    res.json({ body: 'Deu certo' });
    // res.render('cadastro', { validacao: errors, formData: {} });
}