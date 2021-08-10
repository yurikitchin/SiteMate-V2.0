const jwt = require('jsonwebtoken');

const secret = 'iamtylerdurdern';
const expiration = '2h';

module.exports = {
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.employee = data;
    } catch(err) {
      console.log('Invalid token', err.message);
    }

    return req;
  },
  signToken: function ({ empName, email, phone, isManager, managedSites, managedEmployees, _id }) {
    const payload = { empName, email, phone, isManager, managedSites, managedEmployees, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
