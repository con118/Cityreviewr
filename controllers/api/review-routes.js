const router = require("express").Router();
const { Review } = require("../../models");
//const withAuth = require('../../utils/auth');

//Add a new review

router.post("/submit-comment", async (req, res) => {
  try {
    const newReview = await Review.create({
      title: req.body.title,
      reviews: req.body.reviews,
      city_id: req.body.city_id,

      // user_id: 1,
      user_id: req.session.userId,
      //user_id: req.body.user_id,
      // user_id: req.session.user_id,

    });
    console.log("Added values in the database");
    res.status(200).json(newReview);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
module.exports = router;
