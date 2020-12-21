// https://medium.com/@reddy.nie11/authenticate-node-api-with-json-web-token-72f665df6b4c

const User = require("../models/user.js");

const auth = (req, res, next) => {
  //Checking if the token is valid
  const token = req.cookies.ths_auth;

  console.log({ token });

  User.findByToken(token, (err, user) => {
    if (err) {
      throw err;
    }
    console.log({ user });
    if (!user) {
      return res.status(400).json({
        isAuth: false,
        error: true,
      });
    }
    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = auth;
