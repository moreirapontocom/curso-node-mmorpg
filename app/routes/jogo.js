module.exports = function(application) {
    application.get('/jogo', function(req, res) {
        application.controllers.jogoController.jogo(application, req, res);
    });

    application.get('/sair', function(req, res) {
        application.controllers.jogoController.sair(req, res);
    })
}