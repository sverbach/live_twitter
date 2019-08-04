# Live Twitter
Simple web app allowing users to search twitter for latest posted pictures.

# Installation
Live Twitter is running on nodejs, the HTML is built within nodejs.

## Install NodeJS

Obviously - [see here](https://nodejs.dev/how-to-install-nodejs)

## Create Cloudimage & ScraperAPI URLs

Both of these APIs are used in this project, so you'll need to create your personal URLs there firsthand. (no worries, it's free)
https://www.scraperapi.com/
https://www.cloudimage.io/en/home

- Once you've received both of your API keys, create a file **priv_uris.js**,  in the same directory as **app.js**.
- Paste the following code in the new file (replace **[YOUR_API_KEY]**).

```javascript
module.exports  = {

scraper_uri:  "http://api.scraperapi.com?api_key=[YOUR_API_KEY]&url=",

cloudimg_uri:  "https://[YOUR_API_KEY].cloudimg.io/crop/300x300/x/"

}
```

# Run the app

Navigate to the directory of **app.js** in your terminal and type in `node app.js`
Now the app is reachable on 127.0.0.1:443

