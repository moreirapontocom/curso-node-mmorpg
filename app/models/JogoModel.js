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

JogoModel.prototype.acao = function(acao, res) {

    var date = new Date();
    var tempo = '';

    switch (acao.acao) {
        case 1: tempo = 1 * 60 * 6000;
        case 2: tempo = 2 * 60 * 6000;
        case 3: tempo = 5 * 60 * 6000;
        case 4: tempo = 5 * 60 * 6000;
    }

    acao.tempo_para_terminar = date.getTime() + tempo;

    this._connection.open(function(err, client) {
        client.collection('acoes', function(err, collection) {

            collection.insert(acao);

            res.redirect('jogo?erro_validacao=success');
            client.close();
        });
    });

}

module.exports = function() {
    return JogoModel;
}