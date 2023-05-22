const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./routes');

const app = express();
const PORT = 3000;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
