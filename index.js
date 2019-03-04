var express = require('express')
var app = express()


var request = require('request'); // "Request" library

var client_id = 'a1e8617e0c7648d99634ae3a3d192590'; // Your client id
var client_secret = '1215139e9bc046329a2e24582f5863b3'; // Your secret

// your application requests authorization
var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
        grant_type: 'client_credentials'
    },
    json: true
};


// respond with "hello world" when a GET request is made to the homepage
app.get('/api/search/:search', function (req, res) {



    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {

            // use the access token to access the Spotify Web API
            var token = body.access_token;

            //https://api.spotify.com/v1/search?q=Muse&type=track
            var options2 = {
                url: 'https://api.spotify.com/v1/search?q=' + req.params.search +
                    "&type=track",
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                json: true
            };
            res.json({me: 1})
            request.get(options2, function(error, response, body) {

                //error handling here can be better

                //console.log(body);
                //res.json(body)
            });

            //res.send('hello world')

        }
    });
})

app.listen('8050')


