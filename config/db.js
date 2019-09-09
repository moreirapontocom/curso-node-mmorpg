var mongo = require('mongodb');

var mongoConnection = function() {

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