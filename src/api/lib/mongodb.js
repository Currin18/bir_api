const mongoose = require('mongoose');
const { uri, ...config } = require('../../config/config').mongo;

mongoose.connect(uri, config);
mongoose.Promise = Promise;

module.exports = mongoose;
