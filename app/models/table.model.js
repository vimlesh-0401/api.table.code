const mongoose = require('mongoose');
const { SchemaTypes } = require('mongoose')
const Schema = mongoose.Schema;
const tableSchema = new Schema({
  id: SchemaTypes.Number,
  city: SchemaTypes.String,
  start_date: SchemaTypes.Date,
  end_date: SchemaTypes.Date,
  price: SchemaTypes.String,
  status: SchemaTypes.String,
  color: SchemaTypes.String
}, {
  collection: 'tables',
  id: true,
  timestamps: true,
});
module.exports.Table = mongoose.model('Table', tableSchema);