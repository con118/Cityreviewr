const router = require("express").Router();
const { User } = require("../../models");

// CREATE new user(signup)
//http://localhost:3001/api/user

router.post("/", async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    //need to start session**************
    req.session.save(() => {
      req.session.loggedIn = true;
      console.log("Successfully added a user");
      res.status(200).json(dbUserData);
      //Redirect from javaSript not here
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//For Login
router.post("/login", async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      //check its username or email***********************
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res.status(400).json({
        message: "Incorrect email or password. Please try again!",
      });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      res
        .status(200)
        .json({ user: dbUserData, message: "You are now logged in!" });
      //res.redirect("/"); Redirect from javaSript not here
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Logout;
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();

      res.redirect("/");
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
