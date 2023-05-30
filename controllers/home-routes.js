const router = require("express").Router();
const { City, Review, User } = require("../models");
const axios = require('axios');

// gmaps name to lat and lng sing axios

async function getLatLng(city) {
  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(city)}&key=AIzaSyC1L6G-zvkucPsG9X4UPmdxq1SaugJ_0u4`);
      const data = response.data;
      if (data.results && data.results.length > 0) {
          const location = data.results[0].geometry.location;
          return location; 
      } else {
          throw new Error('No results for that address');
      }
  } catch (error) {
      console.error(error);
  }
}


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

//For Login page
router.get("/login", (req, res) => {
  try {
    console.log("HIT", req.session.loggedIn);
    // If the user is already logged in, redirect to the homepage
    if (req.session.loggedIn) {
      return res.redirect("/");
    }
    // Otherwise, render the 'login' template
    res.render("login");
  } catch (error) {
    console.error("\n", error.message, "\n");
  }
});

// Get single city by id for homepage
router.get("/:id", async (req, res) => {

    // Check if req.params.id is a number
    if (isNaN(req.params.id)) {
      res.status(404).send("Page not found");
      return;
    }
  console.log(req.params.id);
  try {
    const singleCityData = await City.findByPk(req.params.id, {
      include: [
        {
          model: Review,
          include: [{ model: User, attributes: ["username"] }],
        },
      ],
      attributes: {
        exclude: ["description", "image"],
      },
    });
    const singleCity = singleCityData.get({ plain: true });
    console.log(singleCity.reviews[0].user);

    
  // get lat and lng for the city name
  let latLng;
  try {
    latLng = await getLatLng(singleCity.city_name);
  } catch (err) {
    console.error(`Unable to get coordinates for city: ${singleCity.city_name}`);
    // handle error, for example by sending an error response or redirecting
    res.status(500).send("Unable to get coordinates for city");
    return;
  }
  // pass lat and lng to the view
  res.render("singleCity", { 
      singleCity, 
      loggedIn: req.session.loggedIn, 
      lat: latLng.lat, 
      lng: latLng.lng  

      });
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

module.exports = router;
