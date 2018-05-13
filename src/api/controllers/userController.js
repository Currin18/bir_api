const swagger = require('../utils/swagger');
const convertAsync = require('../utils/convertAsync');
const requestHelper = require('../utils/requestHelper');
const responseHelper = require('../utils/responseHelper');
const logger = require('../utils/logger');
const uuid = require('../utils/uuid');
const userService = require('../services/userService');

const crypto = require('crypto');

class userController {
    /**
     * GET /user/{userCode} handler
     * @param {Request} req
     * @param {Response} res
     */
    static async getUser(req, res) {
        const userCode = req.swagger.params.userCode.value;

        requestHelper.log(req, userCode);

        try {
            const response = await userService.getUserByCode(userCode);
            logger.debug({ type: 'MONGO', message: response });
            if (response) {
                responseHelper.ok(req, res, {
                    userCode: response.userCode,
                    email: response.email,
                });
            } else {
                responseHelper.notFound(req, res, 'User not found');
            }
        } catch (error) {
            logger.error({ type: 'ERROR', message: error.message });
            responseHelper.error(req, res, 'Failed to obtain user');
        }
    }

    /**
     * POST /user handler
     * @param  {Request}  req
     * @param  {Response}  res
     */
    static async postUser(req, res) {
        const payload = swagger.parseEndpointPayload(req, 'user');

        requestHelper.log(req, payload);

        // Validation payload

        const salt = Math.random();
        const hash = crypto.createHash('sha256')
            .update(payload.password + salt)
            .digest('base64');

        const data = {
            userCode: uuid(),
            email: payload.email,
            password: hash,
            salt,
        };

        try {
            const response = await userService.createtUser(data);
            logger.debug({ type: 'MONGO', message: response })
            responseHelper.created(req, res);
        } catch (error) {
            logger.error({ type: 'ERROR', message: error.message });
            responseHelper.error(req, res, 'Failed to create user');
        }
    }

    /**
     * PUT /user/{userCode}
     * @param  {Request} req
     * @param  {Response} res
     */
    putUser(req, res) {
        const userCode = req.swagger.params.userCode.value;

        requestHelper.log(req, userCode);

        try {

        } catch (error) {
            logger.error({ type: 'ERROR', message: error.message });
            responseHelper.error(req, res, 'Failed to update user');
        }
    }

    /**
     * DELETE /user/{userCode}
     * @param  {Request} req
     * @param  {Response} res
     */
    deleteUser(req, res) {
        const userCode = req.swagger.params.userCode.value;

        requestHelper.log(req, userCode);

        try {
            
        } catch (error) {
            logger.error({ type: 'ERROR', message: error.message });
            responseHelper.error(req, res, 'Failed to delete user');
        }
    }
}

module.exports = {
    getUser: convertAsync(userController.getUser),
    postUser: convertAsync(userController.postUser),
};
