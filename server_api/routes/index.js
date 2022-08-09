const express = require('express');
const router = express.Router();
const ctrlLocations = require('../controllers/companies');
const ctrlQuestions = require('../controllers/questions');
const ctrlAuth = require('../controllers/auth');

//companies
router.get('/companies', ctrlLocations.compareCompanies);

//questions
router.get('/questions', ctrlQuestions.getQuestions);

//auth
router.post('/auth/signin', ctrlAuth.signIn);

router.get('/test/user', ctrlAuth.verifyToken);


module.exports = router;
