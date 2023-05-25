const router = require('express').Router();
const reviewRoutes = require('./reviewRoutes');
const placeRoutes = require('./placeRoutes');



router.use('/reviews', reviewRoutes);
router.use('/places', placeRoutes);



module.exports = router;
