const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");

const sequelize = require("./config/connection");
const routes = require("./controllers");

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'Super Travel Aus',
  cookie: {
    maxAge: 3600000, // Cookie expiration time in milliseconds (1 hour in this example)
  },
  resave: false,
  saveUninitialized: true,
};

app.use(session(sess));

const hbs = exphbs.create({});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
console.log('Static files middleware connected');

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.isAuthenticated) {
    return next();
  }
  res.redirect('/login'); // Redirect to login page if not authenticated
};

// Login route
app.get('/login', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  // Otherwise, render the 'login' template
  res.render("login");
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // Check if username and password match (Replace with your authentication logic)
  if (username === 'admin' && password === 'password') {
    req.session.isAuthenticated = true; // Set isAuthenticated flag in the session
    req.session.loggedIn = true; // Set loggedIn flag in the session
    res.redirect('/dashboard');
  } else {
    res.send('Invalid username or password');
  }
});

// Dashboard route (requires authentication)
app.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('dashboard'); // Assuming you have a dashboard view file (dashboard.handlebars)
});

// Logout route
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    res.redirect('/login');
  });
});

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Server is running on http://localhost:${PORT}`)
  );
});

