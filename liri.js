//store required variables
var fs = require ('fs');
var keys = require('./keys.js');
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var inquirer = require('inquirer');
var command = process.argv[2];

//use terminal to select one of the choices 
inquirer.prompt([
    {
        type: "list",
        message: "Choose One of These",
        choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"],
        name: "choice"  
    },
    ]).then(function (prompt) {
    switchFunction(prompt.choice);
});
//call the function if a certain choice is selected
function choice() {
    if(my-tweets){
        getTweets();
    } 

    else if(spotify-this-song){
        getMeSpotify();
    }

    else if(movie-this){
        getMovies();
    }

    else(do-what-it-says){
        doWhatItSays();
    }
}
// each individual function
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

function getMeSpotify(){

    inquirer.prompt([
        {
            type: 'input',
            message: 'Type in your song:',
            name: "song"
        }
    ]).then(function(song){

    });
    spotify.search({ type: 'artist OR album OR track', query: '' }, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        }
        console.log("-----------------");
        console.log("Artist: " + artist);
        console.log("Song: " + Name);
        console.log("Preview: " + Preview);
        console.log("Album:" + album); 
        console.log("-----------------");
}); 
}

function getMovies(){
    inquirer.prompt([
        {
            type: 'input',
            message: 'Type in movie name: ',
            name: 'name'
        }
    ]).then(function (getMovies) {
        console.log(movie.name);

    request('http://www.google.com', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body); 
    }
    console.log("--------------");
    console.log("Title: " + Title);
    console.log("Year: " + Year);
    console.log("IMDB Rating: " + Rating1);
    console.log("Country: " + Country);
    console.log("Language: " + Language);
    console.log("Plot: " + Plot);
    console.log("Actors: " + Actors);
    console.log("Rotten Tomatoes Rating: " + Rating2);
    console.log("Rotten Tomatoes URL: " + URL);
    console.log("--------------");
})
}

function doWhatItSays(){

}
