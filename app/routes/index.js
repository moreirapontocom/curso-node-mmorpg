module.exports = function(application){
	application.get('/', function(req, res){
		application.controllers.indexController.index(req, res);
	});

	application.post('/autenticar', function(req, res) {
		application.controllers.indexController.autenticar(application, req, res);
	});
}