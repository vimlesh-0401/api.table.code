const express     = require('express');
const bodyParser  = require('body-parser');
const http        = require('http');

const app = express();
const tables = require('./app/routes/tables.routes');
require('./app/database/mongodb');

app.use(bodyParser.urlencoded({ extended: true, limit: '150mb' }));
app.use(bodyParser.json());

app.all("/*", function(_request, response, next){
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Credentials', true);
  response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  response.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Accept, Authorization');
  response.header('Access-Control-Expose-Headers', 'X-Requested-With, X-Pagination');
  next();
});

app.use('/tables', tables);

app.use((request, response, next) => {
  const error = new Error("Not found.");
  error.status = 404;
  next(error);
});

app.use((error, request, response, next) =>  {
  response.status(error.status || 500);
  response.json({
    error: {
      message: error.message
    }
  });
});

const port = 3301;

const  server = http.createServer(app);
server.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});