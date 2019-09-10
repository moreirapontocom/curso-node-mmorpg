function UsuarioModel(connection) {
    this._connection = connection();
}

UsuarioModel.prototype.add = function(formData) {

   this._connection.open(function(err, client) {
       client.collection('usuarios', function(err, collection) {
           collection.insert(formData);
           client.close();
       });
   })

}

UsuarioModel.prototype.autenticar = function(formData, req, res) {

    this._connection.open(function(err, client) {
        client.collection('usuarios', function(err, collection) {
            collection.find(formData).toArray(function(err, result) {
                console.log(result);

                if (!result.length) {
                    res.redirect('/index', { validacao: {}, formData: {} });
                    return;
                }

                req.session.autenticado = true;
                req.session.usuario = result[0].usuario;
                req.session.casa = result[0].casa;

                res.redirect('/jogo');

            });
            client.close();
        })
    });

}

module.exports = function() {
    return UsuarioModel;
}