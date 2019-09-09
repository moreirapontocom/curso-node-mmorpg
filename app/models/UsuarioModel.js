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

module.exports = function() {
    return UsuarioModel;
}