const express = require('express');

const { create, engine } = require('express-handlebars');

const { handlebarHelpers } = require('./views/handlebar-helpers');
const { homeRouter } = require('./routers/home');

const hbs = create({ extname: '.hbs', helpers: handlebarHelpers });

const app = express();

app.engine('.hbs', engine({ extname: '.hbs', helpers: handlebarHelpers }));
app.set('view engine', '.hbs');
app.use(express.static('public'));
app.use(homeRouter)
app.listen(3000);
