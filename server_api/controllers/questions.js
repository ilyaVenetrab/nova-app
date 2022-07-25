const mongoose = require('mongoose');
const Questions = mongoose.model('Questions');

const sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.getQuestions = function (req, res) {
  Questions.find()
    .then(results => {
      let companies = [];
      results.forEach(doc => {
        companies.push({
          title: doc.title.replace('$', `<snap class="color-red">${req.query.name.toUpperCase()}</snap>`),
          revertButton: doc.revertButton,
          refresh: doc.refresh,
          _id: doc._id
        });
      });
      sendJsonResponse(res, 200, companies);
    }).catch(err => sendJsonResponse(res, 404, err));
};
