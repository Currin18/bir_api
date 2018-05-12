const User = require('../models/user');

/**
 * Service for user data
 */
class userService {
    static async getUserById(userId) {

    }

    static async getUserByCode(userCode) {

    }

    /**
     * Insert user in database
     * @param  {Object}  data
     */
    static async createtUser(data) {
        const user = new User(data);
        try {
            return await user.save();
        } catch (error) {
            throw error;
        }
    }

    static async updateUser(userId, data) {

    }

    static async deleteUser(userId) {

    }
}

module.exports = userService;
