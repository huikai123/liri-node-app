var fs = require ('fs');
var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('spotify-web-api-node');
var request = require('request');
var argument2 = process.argv[2];
var argument3 = process.argv[3];

function switchFunction() {
    switch (argument2) {
        case "my-tweets":
            getTweets();
            break;

        case "spotify-this-song":
            if (argument3 == undefined){
                argument3 = "The Sign";
            }
            getMeSpotify();
            break;

        case "movie-this":
            if(argument3 == undefined){
                argument3 = 'Mr. Nobody.';
            }
            getMovies();
             break;

        case "do-what-it-says":
            doWhatItSays();
            break;

        default:
            console.log('invalid input');
    }
}

switchFunction();

function getTweets(){
    var client = new Twitter({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret
    });
    var parameters = {
        twitterHandle: 'Ky-Chung',
        count: 20
    };
    client.get('statuses/user_timeline', parameters, function(error, tweets, response) {
        if (error) {
        console.log("error: " + error);
        }
        for(var i = 0; i < tweets.length; i++){
        console.log("-------------");
        console.log("Date: " + tweets[i].created_at);
        console.log("Tweet: " + tweets[i].text);
        console.log("---------------");
}
})
}

function getMeSpotify(){
    var spotifyApi = new Spotify({            
        clientID: keys.spotifyKeys.client_id,
        clientSecret: keys.spotifyKeys.client_secret
    });

    spotifyApi.searchTracks(argument3, {limit: 1}).then(function (data) {
            var tracks = data.body.tracks.items;
            
            for (var i in tracks){
                console.log("-----------------");
                console.log("Artist: " + tracks[i].artist[0].name);
                console.log("Song: " + tracks[i].name);
                console.log("Preview: " + tracks[i].preview_url);
                console.log("Album:" + tracks[i].album.name); 
                console.log("-----------------");
}; 
})
}

function getMovies(){
    var query_url = "http:/www.omdbapi.com/?t=" + argument3 + "&y=&plot=long&tomatoes=true&r=json";
    request(query_url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
    console.log("--------------");
    console.log("Title: " + JSON.parse(body).Title);
    console.log("Year: " + JSON.parse(body).Released);
    console.log("IMDB Rating: " + JSON.parse(body).IMDBRating);
    console.log("Country: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
    console.log("Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL);
    console.log("--------------");
    }
    else{
        console.log(error);
    }
})
}

function doWhatItSays(){
    fs.readFile("random.txt", "utf8", function(error, data){
        if(error){
            console.log(error);
        } else {
            var dataArray = data.split(",");
            argument2 = dataArray[0];
            argument3 = dataArray[1];
        }
        switchFunction();

    }); 
}

   



