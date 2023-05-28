const router = require("express").Router();
const { City, Review } = require("../models");

//const withAuth = require('../utils/auth');

// Get all Cities for homepage

router.get("/", async (req, res) => {
  const cityData = await City.findAll().catch((err) => {
    res.json(err);
  });
  const cities = cityData.map((city) => city.get({ plain: true }));
  res.render("homepage", { cities, loggedIn: req.session.loggedIn }); // Pass the 'cities' data to the 'homepage' view
});

// signuppage
router.get("/signup", async (req, res) => {
  try {
    res.render("signup"); // Render the signup.handlebars template
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get single city by id for homepage
router.get("/:id", async (req, res) => {
  try {
    const singleCityData = await City.findByPk(req.params.id, {
      include: [{ model: Review }],
      attributes: {
        exclude: ["description", "image"],
      },
    });

    const singleCity = singleCityData.get({ plain: true });
    res.render("singleCity", { singleCity });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get all Reviews for each city

router.get("/reviews/:id", async (req, res) => {
  try {
    console.log("reviews");
    const reviewData = await Review.findAll({
      where: { city_id: req.params.id },
    });

    //console.log(reviewData);
    const reviews = reviewData.map((review) => review.get({ plain: true }));

    //res.status(200).json(reviews);
    res.render("reviews", { reviews });
  } catch (err) {
    res.status(500).json(err);
  }
});

//For Login page

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  // Otherwise, render the 'login' template
  res.render("login");
});
module.exports = router;
