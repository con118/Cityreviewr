const router = require("express").Router();
const { Review } = require("../../models");
//const withAuth = require('../../utils/auth');

//Add new review
// Use withAuth middleware to prevent access to route*********

router.post("/submit-comment", async (req, res) => {
  try {
    const newReview = await Review.create({
      reviews: req.body.reviews,
      city_id: req.body.city_id,
      //user_id: req.body.user_id,
      user_id: req.session.user_id,
    });
    //Do we need session here************

    req.session.save(() => {
      req.session.loggedIn = true;
      res.status(200).json(newReview);
    });
    //res.redirect("/:city_id");
    //res.redirect(`/${city}`);*********need to check
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
module.exports = router;
