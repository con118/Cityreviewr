const router = require('express').Router();
const apiRoutes = require('./api');

// const reviewRoutes = require('./api/reviewRoutes');
// const placeRoutes = require('./api/placeRoutes');


//direct to api folder
router.use('/api', apiRoutes);

module.exports = router;
