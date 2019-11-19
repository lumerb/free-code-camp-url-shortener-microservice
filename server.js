const express = require('express');
const bodyParser = require('body-parser');
const CONSTANTS = require('./config.js');
const app = express();
const route = require('./route.js');

const mongoose = require('mongoose');

mongoose.connect(CONSTANTS.db_url, {
        useNewUrlParser: true
    })
    .then(() => {
        console.log('Successfully connected to MongoDB');
    }).catch(err => {
        console.log(err);
        console.log('There was an error connecting with the db')
        process.exit();
    })

app.use(express.static('public'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

route(app);

app.listen(CONSTANTS.port, () => console.log('App Listening on Port ' + CONSTANTS.port));