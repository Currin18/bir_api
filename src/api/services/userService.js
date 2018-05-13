const User = require('../models/user');

/**
 * Service for user data
 */
class userService {

    /**
     * Get user from database
     * @param  {string}  userCode
     */
    static async getUserByCode(userCode) {
        try {
            return await User.findOne({ userCode });
        } catch (error) {
            throw error;
        }
    }

    /**
     * Get user from database
     * @param  {string}  email
     */
    static async getUserByEmail(email) {
        try {
            return await User.findOne({ email });
        } catch (error) {
            throw error;
        }
    }

    /**
     * Create user in database
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

    static async updateUser(userCode, data) {
        try {
            let user = await User.findOne({ userCode });
            Object.assign(user, data);
            console.log('user ', user);
            return await user.save();
        } catch (error) {
            throw error;
        }
    }

    static async deleteUser(userCode) {
        try {
            return User.remove({ userCode });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = userService;
