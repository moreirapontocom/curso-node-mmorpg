module.exports = function(application) {
    application.get('/cadastro', function(req, res) {
        application.controllers.cadastroController.cadastro(req, res);
    });

    application.post('/cadastrar', function(req, res) {
        application.controllers.cadastroController.cadastrar(req, res);
    })
}