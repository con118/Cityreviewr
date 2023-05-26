const router = require("express").Router();
const { City, Review, Todo } = require("../models");

//const withAuth = require('../utils/auth');

// Get all Cities for homepage
// router.get("/", async (req, res) => {
//   try {
//     console.log("routes");
//     const cityData = await City.findAll({
//       attributes: {
//         exclude: ["city_image", "city_description", "things_todo"],
//       },
//     });

//     //console.log(cityData);
//     const cities = cityData.map((city) => city.get({ plain: true }));

//     //res.status(200).json(cities);

//     res.render("index", {
//       cities,
//       loggedIn: req.session.loggedIn,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get('/', async (req, res) => {

//     res.render('homepage', {

//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get("/", async (req, res) => {
//   const cityData = await City.findAll().catch((err) => {
//     res.json(err);
//   });
//   const cities = cityData.map((city) => city.get({ plain: true }));
//   res.render("homepage", { cities }); // Pass the 'cities' data to the 'homepage' view
// });

// // Get single city by id for homepage

// router.get("/city/:id", async (req, res) => {
//   try {
//     // console.log("cityone");
//     const singleCityData = await City.findByPk(req.params.id, {
//       include: { model: Review, model: Todo },
//       attributes: {
//         exclude: ["description", "image"],
//       },
//     });

//     //console.log(singleCityData);

//     //res.status(200).json(singleCityData);

//     res.render("singleCity", { singleCityData });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
router.get("/city/:id", async (req, res) => {
  try {
    const singleCityData = await City.findByPk(req.params.id, {
      include: { model: Review, model: Todo },
      attributes: {
        exclude: ["description", "image"],
      },
    });

    const {
      city_image: cityImage,
      city_name: cityName,
      city_description: cityDescription,
    } = singleCityData;

    // Extract the things to do and user reviews from related models
    const cityThingsToDo = singleCityData.todos.map((todo) => ({
      things_todo1: todo.things_todo1,
      things_todo2: todo.things_todo2,
      things_todo3: todo.things_todo3,
      things_todo4: todo.things_todo4,
      things_todo5: todo.things_todo5,
    }));

    const cityUserReviews = singleCityData.reviews.map((review) => ({
      title: review.title,
      review: review.review,
      username: review.username,
    }));

    res.render("singleCity", {
      cityImage,
      cityName,
      cityDescription,
      cityThingsToDo,
      cityUserReviews,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Single city by cityname

// router.get("/:name", async (req, res) => {
//   try {
//     console.log(req.params.name);
//     const singleCityData = await City.findOne({
//       where: { city_name: req.params.name },
//       include: { model: Review, model: Todo },
//       attributes: {
//         exclude: ["description", "image"],
//       },
//     });
//     if (singleCityData === null) {
//       //res.status(400).json({ message: "No city found" });
//       res.redirect("/");
//     } else {
//       res.render("singleCity", { singleCityData });
//       //res.status(200).json(singleCityData);
//     }

//     //console.log(singleCityData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

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
  // if (req.session.loggedIn) {
  //   res.redirect("/");
  //   return;
  // }

  res.render("login");
});
module.exports = router;
