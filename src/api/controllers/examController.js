const swagger = require('../utils/swagger');
const convertAsync = require('../utils/convertAsync');
const requestHelper = require('../utils/requestHelper');
const responseHelper = require('../utils/responseHelper');
const logger = require('../utils/logger');
const examService = require('../services/examService');

class examController {
    /**
     * GET /exam/{year}
     * @param {Request} req
     * @param {Response} res
     */
    static async getExamByYear(req, res) {
        const year = req.swagger.params.year.value;
        const version = req.swagger.params.v.value;

        requestHelper.log(req, { year, version });

        try {
            const response = await examService.getExamByYear(year, version);
            logger.debug({ type: 'MONGO', message: response });
            if (response) {
                responseHelper.ok(req, res, response);
            } else {
                responseHelper.notFound(req, res, 'Exam not found');
            }
        } catch (error) {
            logger.error({ type: 'ERROR', message: error.message });
            responseHelper.error(req, res, 'Failed to obtain exam');
        }
    }

    /**
     * POST /exam/{year}?v={v}
     * @param  {Request}  req
     * @param  {Response}  res
     */
    static async postExam(req, res) {
        const year = req.swagger.params.year.value;
        const version = req.swagger.params.v.value;
        const payload = req.swagger.params['questions'].value;

        const data = { year, version, questions: payload }
        requestHelper.log(req, data);

        try {
            const response = await examService.createExam(data);
            logger.debug({ type: 'MONGO', message: response })
            responseHelper.created(req, res);
        } catch (error) {
            logger.error({ type: 'ERROR', message: error.message });
            responseHelper.error(req, res, 'Failed to create exam');
        }
    }
}

module.exports = {
    getExamByYear: convertAsync(examController.getExamByYear),
    postExam: convertAsync(examController.postExam),
}
