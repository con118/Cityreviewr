const router = require("express").Router();
const { City, Review, User, Todo } = require("../models");

// Get all Cities for homepage
router.get("/", async (req, res) => {
  try {
    console.log("routes");
    const cityData = await City.findAll({
      attributes: {
        exclude: ["city_image", "city_description", "things_todo"],
      },
    });

    //console.log(cityData);
    const cities = cityData.map((city) => city.get({ plain: true }));

    res.status(200).json(cities);

    // res.render("homepage", { cities });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get sigle city by id for homepage
router.get("/:id", async (req, res) => {
  try {
    console.log("cityone");
    const singleCityData = await City.findByPk(req.params.id, {
      include: { model: Review, model: Todo },
      attributes: {
        exclude: ["description", "image"],
      },
    });

    //console.log(singleCityData);

    res.status(200).json(singleCityData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//For Login page

// router.get("/login", async (req, res) => {
//     //verification

//     res.render("login");
//   });

module.exports = router;
