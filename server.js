const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
//const routes = require("./routes");

const session = require("express-session");
const sequelize = require("./config/connection");
const routes = require("./controllers");

const app = express();
const PORT = process.env.PORT || 3001;
//const PORT = 3000;

const hbs = exphbs.create({});
//app.engine("handlebars", exphbs());
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//app.use(express.static("public"));
app.use(routes);
//app.use("/", routes);

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Server is running on http://localhost:${PORT}`)
  );
});
