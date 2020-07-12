var extend = require('lodash/extend');

module.exports.localQuery = (request,response,next) =>{
  request.params = extend({}, request.query, request.body, request.params);
  response.locals.request = request;
  response.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  next();
};