const mongoose = require('mongoose');
const { uri, ...config } = require('../../config/config').mongo;

var db = mongoose.connect(uri, config);
mongoose.Promise = Promise;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("db connected");
});

module.exports = mongoose;
