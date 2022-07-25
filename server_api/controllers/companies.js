const mongoose = require('mongoose');
const Comp = mongoose.model('Companies');

const sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.compareCompanies = function (req, res) {
  Comp.find()
    .then(results => {
    let companies = [];
    results.forEach(doc => {
      companies.push({
        title: doc.title,
        active: doc.active,
        isMain: doc.isMain,
        _id: doc._id
      });
    });
    sendJsonResponse(res, 200, companies);
  }).catch(err => sendJsonResponse(res, 404, err));
};
