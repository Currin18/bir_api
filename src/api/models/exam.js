const mongoose = require('../lib/mongodb');
const config = require('../../config/config').mongoSchema;

const { Schema } = mongoose;

const QuestionSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    impugned: Boolean,
    statement: {
        type: String,
        required: true,
    },
    answers: [String],
    correctAnswer: Number,
    tags: [String],
})

const ExamSchema = new Schema({
    year: {
        type: Number,
        required: true,
    },
    version: {
        type: Number,
        defaltu: 1,
    },
    questions: [QuestionSchema],
}, config);

module.exports = mongoose.model('exam', ExamSchema, 'exam');
