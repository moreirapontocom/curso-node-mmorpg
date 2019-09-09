module.exports = function(application) {
    application.get('/cadastro', function(req, res) {
        application.controllers.cadastroController.cadastro(req, res);
    });
}