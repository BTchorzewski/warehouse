const express = require('express');

const { engine } = require('express-handlebars');

const bodyParser = require('body-parser');

const dotenv = require('dotenv').config();

const mongoose = require('mongoose');

const { handlebarHelpers } = require('./views/handlebar-helpers');

const { homeRouter } = require('./routers/home');
const { printerRouter } = require('./routers/printer');
const { supplyRouter } = require('./routers/supply');

const app = express();

app.engine('.hbs', engine({ extname: '.hbs', helpers: handlebarHelpers }));
app.set('view engine', '.hbs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded());


// routers
app.use(homeRouter);
app.use(printerRouter);
app.use(supplyRouter);
try {
  app.listen(process.env.PORT || 3000, () => {
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
    });

    console.log(`Server starts on localhost:${process.env.PORT || 3000}`);
  });
} catch {
  throw new Error('Something wrong with server');
}
