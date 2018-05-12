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
     * POST /user handler
     * @param  {Request}  req
     * @param  {Response}  res
     */
    static async createUser(req, res) {
        const payload = swagger.parseEndpointPayload(req, 'user');
        const app = req.applicationObject;

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
            await userService.createtUser(data);
            responseHelper.created(req, res);
        } catch (error) {
            logger.error({ type: 'ERROR', message: error.message });
            responseHelper.error(req, res, 'Failed to create user');
        }
    }
}

module.exports = {
    createUser: convertAsync(userController.createUser),
};
