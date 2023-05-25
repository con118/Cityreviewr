const router = require('express').Router();

// Import the model
const { Place, Review, Traveller } = require('../../models');


router.post('/', async (req, res) => {
  try {
  const newPlace = await Place.create(req.body);
  res.status(200).json(newPlace);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.get('/', async (req, res) => {
  try {
    const data = await Place.findAll({
      include: [{ model: Review} , { model: Traveller}],
    });
    res.status(200).json(data);
    } catch (err) {
  res.status(500).json(err);
  return res.json(data);
}});



module.exports = router;