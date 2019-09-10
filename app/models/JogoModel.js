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

    switch (parseInt(acao.acao)) {
        case 1: tempo = 1 * 60 * 6000; break;
        case 2: tempo = 2 * 60 * 6000; break;
        case 3: tempo = 5 * 60 * 6000; break;
        case 4: tempo = 5 * 60 * 6000; break;
    }

    acao.tempo_para_terminar = date.getTime() + tempo;

    var moedas = null;

    switch (parseInt(acao.acao)) {
        // Aqui está valor negativo pois estou tirando moedas do cara
        // Na query está sendo incrementado de um negativo, então faz a subtração
        case 1: moedas = -2 * acao.quantidade; break
        case 2: moedas = -3 * acao.quantidade; break
        case 3: moedas = -1 * acao.quantidade; break
        case 4: moedas = -1 * acao.quantidade; break
    }

    this._connection.open(function(err, client) {

        // Cria as ações

        client.collection('acoes', function(err, collection) {
            collection.insert(acao);
        });

        // Atualiza as moedas

        client.collection('jogo', function(err, collection) {
            // Terceiro parâmetro do update é opcional e default TRUE (atualizar múltiplos registros)
            // O $inc (no lugar do $set) incrementa
            collection.update({ usuario: acao.usuario }, { $inc: { moeda: moedas } });
            client.close();
            res.redirect('jogo?erro_validacao=success');
        });

    });

}

JogoModel.prototype.getAcoes = function(usuario, res) {

    var date = new Date();
    var momento_atual = date.getTime();

    this._connection.open(function(err, client) {
        client.collection('acoes', function(err, collection) {
            collection.find({ usuario: usuario, tempo_para_terminar: {$gt: momento_atual} }).toArray(function(err, result) {

                client.close();
                res.render('pergaminhos', { acoes: result });
            });
        });
    });

}

module.exports = function() {
    return JogoModel;
}