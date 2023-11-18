const userModel = require('../database/models/user.model')
const helper = require("../helpers/helpers")



class User {
    static register = async (req, res) => {
        try {
            const userData = new userModel(req.body)
            await userData.save()
            const token = await userData.generateToken()
            const responseData = {
                "id": userData.id,
                "tokaccessTokenen": token,
            }
            helper.responseHandler(res, 201, true, responseData, "User registered successfully")
        }
        catch (e) {
       
            helper.responseHandler(res, 500, false, e, e.message)
        }
    }
    static getSingleUser = async (req, res) => {
        const id = req.params.id;
        try {
            const userData = await userModel.findById(id);
            
            const responseData = {
                "id": userData.id,
                "firstName": userData.firstName,
                "lastName": userData.lastName,
                "marketingConsent": userData.marketingConsent
            }
            
            if (!userData) {
                helper.responseHandler(res, 404, false, null, "User does not exist")

            } else {
                helper.responseHandler(res, 200, true, responseData, "User found")
            }
        }
        catch (e) {
            helper.responseHandler(res, 500, false, e, e.message)
        }
    }


    static updateUserData = async (req, res) => {
        try {
            const userData = await userModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!userData) {
                helper.responseHandler(res, 404, false, null, "User Is not exist")
            } else {

                helper.responseHandler(res, 200, true, userData, "User updated")
            }
        }
        catch (e) {
            helper.responseHandler(res, 500, false, e, e.message)
        }
    }

    static deleteUser = async (req, res) => {
        try {
            const userData = await userModel.findByIdAndDelete(req.params.id)

            if (!userData) {
                helper.responseHandler(res, 404, false, null, "User Is not exist")
            } else {

                helper.responseHandler(res, 200, true, userData, "User deleted")
            }

        } catch (e) {
            helper.responseHandler(res, 500, false, e, e.message)
        }
    }

}
module.exports = User