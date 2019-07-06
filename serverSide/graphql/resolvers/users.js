const User               = require('../../models/User');
const bcrypt             = require('bcryptjs');
const jwt                = require('jsonwebtoken');
const { SECRETE_KEY }    = require('../../config');
const { UserInputError } = require('apollo-server');
const { validateRegister, validateLogin }= require('../../Util/validate');

// generate token
function generateToken(user){
    return jwt.sign({
        id: user.id,
        username: user.username,
        email: user.email
    }, SECRETE_KEY, { expiresIn: '1h'});
};

module.exports = {
    Mutation: {
        async login(_, {
            loginInput: 
            {
                username, 
                password
            }}){
            const {errors, valid} = validateLogin(username, password);
            const user = await User.findOne({username});

            if(!valid){
                throw new UserInputError('Something wrong', {errors});
            }
            
            if(!user){
                errors.general = 'User not found';
                throw new UserInputError('User not found', {errors});
            } 

            const match = await bcrypt.compare(password, user.password);

            if(!match){
                errors.general = 'Wrong credentials';
                throw new UserInputError('Wrong credentials', {errors});
            }

            const token = generateToken(user);

            return {
                ...user._doc,
                id: user._id,
                token
            }
        },
        async register(_,
            {
                registerInput: 
                {
                    username, 
                    email, 
                    password, 
                    confirmPassword 
                }
            }){
            // validate user data
            const { valid, errors } = validateRegister(
                username, 
                email, 
                password, 
                confirmPassword);
            if(!valid){
                throw new UserInputError('Errors', { errors });
            }
            // make user doesn't already exist
            const user = await User.findOne({username});
            if(user){
                throw new UserInputError('username is already exist', {
                    errors: {
                        username: 'This username is taken'
                    }
                });
            }
            // hash password and create an auth token
            password = await bcrypt.hash(password, 12);
            const new_user = new User({
                username,
                email,
                password,
                createdAt: new Date().toISOString()
            }); 
            const res = await new_user.save();
            
            const token = generateToken(new_user);

            return {
                ...res._doc,
                id: res._id,
                token
            }

        }
    }
}