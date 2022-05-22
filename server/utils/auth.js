const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhhhh';  // set token secret and expiration date
const expiration = '4h';

module.exports = {
  authMiddleware: function (req, res, next) {  // function for our authenticated routes
    let token = req.query.token || req.headers.authorization;   // allows token to be sent via  req.query or headers

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return res.status(400).json({ message: 'You have no token!' });
    }

    try {   // verify token and get user data out of it
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
      return res.status(400).json({ message: 'Invalid token!' });
    }

    next();   // send to next endpoint
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
