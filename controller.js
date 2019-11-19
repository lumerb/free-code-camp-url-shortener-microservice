const dns = require('dns');
const Url = require('./model.js');

const generateShortURL = () => {
    return Math.floor(Math.random() * 1000);
}

exports.shortURL = (req, res) => {
    let shortURL = req.params.url
    Url.findOne({
            'short_url': shortURL
        })
        .then(url => {
            if (!url) {
                res.send(`${shortURL} not found.`)
            } else {

                res.redirect(url.original_url)

            }
        }).catch(err => {
            console.log(err)
        })

}

exports.urlshortener = (req, res) => {

    const url = req.body.url;
    const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    const isValidURL = regex.test(url);
    let newObj = {};


    if (isValidURL) {

        dns.lookup(url.replace(/https?:\/\/(www\.)?/g, ''), (err, address, family) => {
            const strURL = generateShortURL().toString();

            if (address !== null) {
                newUrl = new Url({
                    original_url: url,
                    short_url: strURL
                })

                newUrl.save()
                    .then(data => {
                        res.send(data)
                    }).catch(err => {
                        res.status(500).send({
                            message: err.message || 'There was an error connecting to MongoDB'
                        })
                    })

            } else {
                res.json({
                    error: "Invalid URL"
                })
            }
        });
    } else {

        res.json({
            error: "Invalid URL"
        })
    }

}