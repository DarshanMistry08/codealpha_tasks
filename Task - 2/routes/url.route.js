const express = require ('express');

const {handlegenerateNewShortURL, handlegenerateAnalytics} = require('../controllers/url.controller');

const router = express.Router();

router.post("/", handlegenerateNewShortURL);

router.get('/analytics/:shortId',handlegenerateAnalytics);


module.exports = router;

