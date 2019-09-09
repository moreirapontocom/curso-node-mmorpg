module.exports = function(application) {
    application.get('/jogo', function(req, res) {
        application.controllers.jogoController.jogo(req, res);
    });
}