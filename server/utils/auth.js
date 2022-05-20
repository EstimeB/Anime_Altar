//  import
const jwt = require('jsonwebtoken');

//  creating a variable and assign values
const secret = 'nani';
const expiration = '2h';

//  authorizing user request 
const authMiddleware = ({ req }) => {

    //  allows token to be sent 
    let token = req.body.token || req.query.token || req.headers.authorization;

    //  splits the token array and returns the requested token
    if (req.headers.authorization) {
        token = token.split(' ').pop().trim();
    }

    if (!token) {
        return req;
    }
    //  allows users data to be accessed in the resolver  
    try {
        const { data } = jwt.verify(token, secret, { maxAge: expiration });
        req.user = data;
    } catch {
        console.log('Invalid token');
    }
    //  return request object to be passed as "context" to the resolver
    return req;
};
const signToken = ({ email, username, _id }) => {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

module.export = {authMiddleware, signToken};