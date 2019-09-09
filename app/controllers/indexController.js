module.exports.index = function(req, res) {
    res.render('index', { validacao: {}, formData: {} });
}

module.exports.autenticar = function(application, req, res) {

    var formData = req.body;

    req.assert('usuario', 'Usuário é obrigatório').notEmpty();
    req.assert('senha', 'Senha é obrigatório').notEmpty();

    var errors = req.validationErrors();
    if (errors.length) {
        res.render('index', { validacao: errors, formData: formData });
        return;
    }

    var connection = application.config.db;
    var UsuarioModel = new application.models.UsuarioModel(connection);

    UsuarioModel.autenticar(formData, req, res);

}