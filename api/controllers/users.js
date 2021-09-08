const models = require('../../models/index');
const returns = require('./returns');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


exports.signup = async (req, res, next) => {
    console.log("we in signup module")
    try {
        console.log("we are in signup module")
         
           
        //create the user in the database
        const createdUser = await models.user.create({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
            //status: 0
        });
        

        const token = crypto.randomBytes(64).toString('hex');

        //save the token to the database
        const validation = await models.token.create({
            user_id: createdUser.id,
            token: token,
            status: 1
        });
        const get_token = await models.token.findOne({
            where: {
                user_id: createdUser.id
            }
        })
        // const sendEmail = await emailController.sendEmilVerificationToken(createdUser.email, get_token.token);

        data = {
            createdUser
            
        }
        await returns.successful_returns(req, res, data);
        console.log(createdUser)

    } catch (err) {
        console.log(err)
        const serverError = await returns.serverError(req, res, err);
    }

};

//login function
exports.login = async (req, res, next) => {
    try {
        console.log("we are in log in module");

        const user = await models.user.findOne({

            where: {
                email: req.body.email
            }
        });
        
        if (!user) {
            //return validation error
            const message = "You are not registered";
            const validationError = await returns.validationErrors(req, res, message);
            return;
        }
        
    
        if(user) {
            
            const token = jwt.sign({ userId: user.id }, 'RANDOM_TOKEN_SECRET', { expiresIn: 60 * 60 });
            console.log('token',token);

           let data = {
               user,
              "token": token
           }

           await returns.successful_returns(req, res, data);
        } 
    } catch (err) {
        console.log(err)
        const serverError = await returns.serverError(req, res, err);
    }

};

//function to update the user password
exports.updatePassword = async (req, res, next) => {
    try {
        console.log(req.params.token)
        //check if the token is valid
        //get the token from the db
        const verify_user = await models.token.findOne({
            where: {
                token: req.params.token
            }
        });
        if (!verify_user) {
            const message = "Token expired";
            const validationError = await returns.validationErrors(req, res, message);
            return;
        }

        let mypass = bcrypt.hashSync(req.body.password, 10);

        //update password
        const update_user_password = await models.user.update({
            password: mypass
        }, {
            where: {
                id: verify_user.user_id
            }
        });

        data = {
            message: "Success"
        }
        await returns.successful_returns(req, res, data);
    } catch (err) {
        console.log(err)
        const serverError = await returns.serverError(req, res, err);
    }
}
