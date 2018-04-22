var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Esquema de como quiero mis productos
var schema = new Schema({

  titulo: {type: String, required: true},
  descripcion: {type: String, required: true},
  lugar: {type: String, required: true},
  isActive: {type: Boolean, required: true}

});

module.exports = mongoose.model('Tour', schema);
