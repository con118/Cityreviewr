const router = require('express').Router();


// Import the model
const { Review, Place, Traveller } = require('../../models');

/// create review 
router.post('/', async (req, res) => {
  try {
    const reviewData = await Review.create({
      place_id: req.body.place_id,
      review_text: req.body.review_text,
      rate: req.body.rate,
      //traveller_id: req.body.traveller_id
      traveller_id: 1
    });
    res.status(200).json(reviewData);
    } catch (err) {
      res.status(400).json(err);
    }
});


/////////////////////////////
router.get('/:place', async (req, res) => {
  try{
  const place = await Place.findOne({
    where: {place_name: req.params.place}
  });
    const review = await Review.findAll({ where: {place_id: place.id},
      include: [{ model: Place}, { model: Traveller}]});
  //console.log(review);
  res.status(200).json(review);
} catch (err) {
  res.status(400).json(err);
}
});

//////////////////////////////
router.get('/', async (req, res) => {
  try {
    const data = await Review.findAll({
      include: [{ model: Place }, { model: Traveller}],
  });
  
  res.status(200).json(data);

} catch (err) {
  res.status(500).json(err);
}
});


module.exports = router;