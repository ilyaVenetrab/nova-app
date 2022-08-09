const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = mongoose.model('User');

const sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.signIn = function (req, res) {
  User.findOne({
    username: req.body.username,
  })
    .exec((err, user) => {
      if (err) {
        return sendJsonResponse(res, 500, err);
      }
      if (!user) {
        return sendJsonResponse(res, 200, {
          success: false,
          message: 'User Not found.'
        });
      }

      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return sendJsonResponse(res, 200, {
          success: false,
          message: 'Invalid Password!'
        });
      }

      req.session.token = jwt.sign({ id: user._id }, 'bezkoder-secret-key' ,{
        expiresIn: 86400 , // 24 hours
      });

      console.log('set req.session.isNew ======>' , req.session.isNew);
      console.log('set req.session.isPopulated => ', req.session.isPopulated);
      sendJsonResponse(res, 200, {
        success: true,
        _id: user._id,
        username: user.username,
        accessToken: req.session.token
      });
    });
};

module.exports.verifyToken = (req, res, next) => {
  console.log('req.session.isNew => ', req.session.isNew);
  console.log('req.session.isPopulated => ', req.session.isPopulated);
  let token = req.session.token;
  if (!token) {
    return sendJsonResponse(res, 200, {
      message: 'No token provided!',
      success: false
    });
  }
  jwt.verify(token, 'bezkoder-secret-key', (err, decoded) => {
    if (err) {
      return sendJsonResponse(res, 200, {
        message: 'Unauthorized',
        success: false
      });
    }
    req.userId = decoded.id;

    sendJsonResponse(res, 200, {
      message: 'User Content.',
      success: true
    });
  });
}
