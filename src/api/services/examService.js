const Exam = require('../models/exam');

/**
 * Service for exam data
 */
class examService {

    /**
     * Get exam from database
     * @param  {Number} year
     */
    static async getExamByYear(year, version = 1) {
        try {
            return await Exam.find({ year, version });
        } catch (error) {
            throw error;
        }
    }

    /**
     * Create exam in database
     * @param  {Object}  data
     */
    static async createExam(data) {
        if (!data.version) {
            data.version = 1;
        }
        const exam = new Exam(data);
        try {
            return await exam.save();
        } catch (error) {
            throw error;
        }
    }
}

module.exports = examService;
