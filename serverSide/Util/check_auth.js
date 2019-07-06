const jwt = require('jsonwebtoken');
const { SECRETE_KEY } = require('../config');
const {AuthenticationError} = require('apollo-server');

module.exports = (context) => {
    const authHeader = context.req.headers.authorization;

    if(authHeader){
        const token = authHeader;
        if(token){
            try{
                const user = jwt.verify(token, SECRETE_KEY);
                return user;
            } catch(err){
                throw new AuthenticationError('Invalid / Expired token');
            }
        }

        throw new Error('Authentication token must be \'Bearer [token]');
    }

    throw new Error('Autherization header must be provided');

}