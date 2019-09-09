module.exports = function(application){
	application.get('/', function(req, res){
		application.controllers.indexController.index(req, res);
	});
}