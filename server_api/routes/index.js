const express = require('express');
const router = express.Router();
const ctrlLocations = require('../controllers/companies');
const ctrlQuestions = require('../controllers/questions');

//companies
router.get('/companies', ctrlLocations.compareCompanies);

//questions
router.get('/questions', ctrlQuestions.getQuestions);

module.exports = router;
