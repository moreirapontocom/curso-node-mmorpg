function JogoModel(connection) {
    this._connection = connection();
}

JogoModel.prototype.gerarParametros = function(usuario) {

    this._connection.open(function(err, client) {
        client.collection('jogo', function(err, collection) {
            collection.insert({
                usuario: usuario,
                moeda: 15,
                suditos: 10,
                temor: Math.floor(Math.random() * 1000),
                sabedoria: Math.floor(Math.random() * 1000),
                comercio: Math.floor(Math.random() * 1000),
                magia: Math.floor(Math.random() * 1000)
            });

            client.close();
        });
    });

}

JogoModel.prototype.iniciaJogo = function(usuario, casa, res, erro_validacao) {

    this._connection.open(function(err, client) {
        client.collection('jogo', function(err, collection) {
            collection.find({ usuario: usuario }).toArray(function(err, result) {
                res.render('jogo', { img_casa: casa, jogo: result[0], validacao: erro_validacao });
                client.close();
            });
        });
    });

}

module.exports = function() {
    return JogoModel;
}