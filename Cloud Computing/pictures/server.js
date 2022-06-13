const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = require("./root/router");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use('/upload', router)

app.listen(8080, function () {
  console.log('Server is running on ' + 8080);
});