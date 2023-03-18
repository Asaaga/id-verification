const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const dotenv = require('dotenv');
const flash = require('connect-flash');
const authRoute = require('./routes/auth');
const studentRoute = require('./routes/students');
dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/images', express.static(path.join(__dirname, 'images')));
const MONGODB_URI =
  'mongodb+srv://simon:simon@cluster0.xefoe.mongodb.net/barcode';

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'session',
});

app.use(
  session({
    secret: 'thisismysecret',
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(flash());

app.use(studentRoute);
app.use(authRoute);

mongoose
  .connect('mongodb+srv://simon:simon@cluster0.xefoe.mongodb.net/barcode')
  .then((result) => {
    app.listen(process.env.PORT || 3000, () => {
      console.log('app is listen at 3000');
    });
  })
  .catch((err) => {
    console.log(err);
  });
