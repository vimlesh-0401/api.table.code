const mongoose    = require('mongoose');
url = 'mongodb://localhost:27017/api_table_demo'
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.set('debug', true);
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Database is connected.")
},() => {
  console.log("Cannot connect to Database.");
})
