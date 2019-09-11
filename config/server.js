/* importar o módulo do framework express */
var express = require('express');

/* importar o módulo do consign */
var consign = require('consign');

/* importar o módulo do body-parser */
var bodyParser = require('body-parser');

/* importar o módulo do express-validator */
var expressValidator = require('express-validator');

var expressSession = require('express-session');

/* iniciar o objeto do express */
var app = express();

/* setar as variáveis 'view engine' e 'views' do express */
app.set('view engine', 'ejs');
app.set('views', './app/views');

/* configurar o middleware express.static */
app.use(express.static('./app/public'));

/* configurar o middleware body-parser */
app.use(bodyParser.urlencoded({extended: true}));

/* configurar o middleware express-validator */
app.use(expressValidator());

app.use(expressSession({
	secret: 'lucasmoreira',
	resave: false,
	saveUninitialized: false
}));

/* efetua o autoload das rotas, dos models e dos controllers para o objeto app */
consign()
	.include('app/routes')
	.then('config/db.js')
	.then('app/models')
	.then('app/controllers')
	.into(app);

// Middleware pra tratar os status de resposta
// Tem que ficar aqui no final pra não interromper o fluxo
app.use(function(req, res, next) {
	res.status(404).send('Ops. Página não encontrada');
	// Também é possível usar o render() de uma view
	// res.status(404).render('view-404.ejs');
	next();
});

// Pra testar essa função, colocar uma víew inexistente no indexController.index(), por exemplo
// Deixei comentado pra não atrapalhar no meu debug
/*
app.use(function(err, req, res, next) {
	res.status(500).send('Ops. Deu um pau aqui');
	next();
});
*/

/* exportar o objeto app */
module.exports = app;