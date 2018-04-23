//require core dependencies
const path = require('path');
// load all env variables from .env file into process.env object.
require('dotenv').config()

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const tourneyRouter = require('./routes/router');
const createRouter = require('./routes/createRouter');
const matchRouter = require('./routes/matchrouter');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', tourneyRouter);
app.use('/create', createRouter);
app.use('/match', matchRouter);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`listening on port ${PORT}`);
})
