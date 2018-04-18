//require core dependencies
const path = require('path');

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const PORT = 3000;

const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);

})
