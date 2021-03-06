module.exports = function(application) {
    application.get('/jogo', function(req, res) {
        application.controllers.jogoController.jogo(application, req, res);
    });

    application.get('/sair', function(req, res) {
        application.controllers.jogoController.sair(req, res);
    });

    application.get('/suditos', function(req, res) {
        application.controllers.jogoController.suditos(application, req, res);
    });

    application.get('/pergaminhos', function(req, res) {
        application.controllers.jogoController.pergaminhos(application, req, res);
    });

    application.post('/ordenar_acao_suditos', function(req, res) {
        application.controllers.jogoController.ordenar_acao_suditos(application, req, res);
    });

    application.get('/revogar_ordem', function(req, res) {
        application.controllers.jogoController.revogarOrdem(application, req, res);
    });

}