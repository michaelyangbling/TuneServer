const express = require('express')
const app = express()

// A && B returns the value A if A can be coerced into false; otherwise, it returns B.
// A || B returns the value A if A can be coerced into true; otherwise, it returns B.
const request = require('request'); // "Request" library
const cors = require('cors');


// Then use it before your routes are set up:

//local
//app.use(cors({credentials: true, origin: 'http://localhost:3000'}));


//remote
app.use(cors({credentials: true, origin: 'https://tune-s.herokuapp.com'}));

// var allowCrossDomain = function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*"); // allow requests from any other server
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); // allow these verbs
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");}
//
// app.use(allowCrossDomain); // plumbing it in as middleware


const client_id = 'a1e8617e0c7648d99634ae3a3d192590'; // Your client id, han's
const client_secret = '1215139e9bc046329a2e24582f5863b3'; // Your secret

// your application requests authorization
const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
        grant_type: 'client_credentials'
    },
    json: true
};


app.get('/api/search/:search', function (req, res) {
    //console.log(req.params.search, 1)


    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {

            // use the access token to access the Spotify Web API
            let token = body.access_token;

            //https://api.spotify.com/v1/search?q=Muse&type=track
            let options2 = {
                url: 'https://api.spotify.com/v1/search?q=' + req.params.search +
                    "&type=track",
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                json: true
            };
            //console.log(req.params.search)
            //res.json({me: 1})
            request.get(options2, function(error, response, body) {

                //error handling here can be better

                //console.log(body);
                res.json(body)//send first one met
            });

            //res.send('hello world')

        }
    });
})

app.get('/api/track/:id', function (req, res) {
    //console.log(req.params.search, 1)


    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {

            // use the access token to access the Spotify Web API
            let token = body.access_token;

            //https://api.spotify.com/v1/search?q=Muse&type=track
            let options2 = {
                url: 'https://api.spotify.com/v1/tracks/' + req.params.id,
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                json: true
            };
            //console.log(req.params.search)
            //res.json({me: 1})
            request.get(options2, function(error, response, body) {

                //error handling here can be better

                //console.log(body);
                res.json(body)//send first one met
            });

            //res.send('hello world')

        }
    });
})

const port = process.env.PORT || 5000;//heroku or local
app.listen(port)


