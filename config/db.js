var mongo = require('mongodb');

var mongoConnection = function() {
    console.log('Criou a conexão NECESSÁRIA com o banco');

    var db = new mongo.Db(
        'got',
        new mongo.Server(
            'mongo',
            27017,
            {} // configs opcionais
        ),
        {} // configs opcionais
    );

    return db;
}

module.exports = function() {
    return mongoConnection;
}