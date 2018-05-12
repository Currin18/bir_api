const mongoose = require('../lib/mongodb');
const config = require('../../config/config').mongoSchema;

const { Schema } = mongoose;

const userSchema = new Schema({
    userCode: {
        type: String,
        required: true,
    },
    // name: String,
    email: String,
    password: String,
    salt: String,
}, config);

module.exports = mongoose.model('user', userSchema, 'user');
