const control = require('./controller.js');

module.exports = (app) => {

    app.post('/api/shorturl/new', control.urlshortener);
    app.get('/api/shorturl/:url', control.shortURL);

}