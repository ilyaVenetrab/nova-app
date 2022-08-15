const mongoose = require('mongoose');
const Questions = mongoose.model('Questions');

const sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.getQuestions = function (req, res) {
  console.log('set req.session.isPopulated => ', req.session.isPopulated);
  Questions.find()
    .then(results => {
      let questions = [];
      results.forEach(doc => {
        questions.push({
          title: doc.title,
          revertButton: doc.revertButton,
          refresh: doc.refresh,
          _id: doc._id
        });
      });
      sendJsonResponse(res, 200, questions);
    }).catch(err => {
      sendJsonResponse(res, 404, err)
    });
};
