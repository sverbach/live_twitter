/*  ===================
    live twitter v1.0
    made by Sven Erbach
    ===================
    
    NOTICE: make sure to create a priv.uris.js file within the same directory as this file
    and let it export the properties scraper_uri & cloudimg_uri (see instructions)

    to run use nodejs and "node app.js" :)
 */
let request = require("request");
let sanitizer = require('sanitizer');
let express = require('express');
let app = new express();
let urls = require('./priv_uris');
let searchitem = "smash bros";

const uri = "https://twitter.com/search?q=";
const twitter_uri = "https://twitter.com";
const hostname = '127.0.0.1';
const port = 443;

app.get("/", (req, res) =>{
    if(req.query.searchterm) {
        searchitem = sanitizer.sanitize(req.query.searchterm);
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    request({
        uri:urls.scraper_uri + uri + searchitem,
    }, function(error, response, body) {
        let tweet_pattern = /data-item-type="tweet"((.|\n)*?)<div class="stream-item-footer">/g;
        let tweets = body.toString().match(tweet_pattern);
        let tweetMap = buildTweetMap(tweets);
        let page = renderPage(tweetMap);
        res.end(page);
    });
});

app.get("/css/style.css", (req, res) => {
    res.sendFile(__dirname + '/public/css/style.css');
});


let server = app.listen(port, function () {
    console.log("live twitter listening at http://%s:%s", hostname, port)
});

function renderPage(tweetMap) {
    let imgshtml = '';

    for (let [key, value] of tweetMap) {
        imgshtml += '<a href="' +twitter_uri+key+ '"><img src="'+urls.cloudimg_uri+value+'"></a>\n'
    }

    let html = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="description" content="Live Twitter">
            <meta name="keywords" content="Live Twitter, scraperapi, cloudimg, nodejs">
            <meta name="author" content="Sven Erbach">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" type="text/css" href="css/style.css">
            <title>live twitter</title>
        </head>
        <body>
            <article>
                    <header> 
                        <form action="/" method="get"> 
                            <label>Search twitter for:</label>
                            <input type="text" name="searchterm" value="`+searchitem+`">
                        </form>
                    </header>
                    <main>
                    `+imgshtml+`
                    </main>
            </article>
        </body>
    </html>
    `
    return html;
}

function buildTweetMap(tweets) {
    let map = new Map();
    let url_pattern = /data-image-url="(.*?)[.]jpg"/;
    let id_pattern = /permalink-path=".+"/;
    tweets.forEach((item, index) => {
        let tweet = item;
        let id = tweet.match(id_pattern);
        let img = tweet.match(url_pattern);
        if(img) {
            let link_id = id.toString().replace('permalink-path="',"");
            map.set(link_id, img[1]+".jpg");
        }
    });
    return map;
}