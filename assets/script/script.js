//SPOTIFY API functions

//setting global varaibles for the SpotifyAPI so we can access the retrieved json data in various functions

let savedArtistData = [];

let tokenData = [];

let token = "";

let artistGenre = "";

//CHANGE THIS TO THE USERINPUT FORM SUBMIT BUTTON - THIS IS ONLY TEMPORARY TO INITIATE THE SPOTIFY API CALL

let artistBtn = document.getElementById("temporary-start-button");

//ID's to authorise the Spotify API call

let clientId = "01c9a8e4c05447c697c5bc044cb8d512";
let clientSecret = "cef744acfdb142c68f81d49f01f6a6b7";

//SPOTIFY API function to get authorisation token

async function getToken() {

    let apiReq = "https://accounts.spotify.com/api/token";

    let spotifyApiReq = await fetch(apiReq, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic " + btoa(clientId + ":" + clientSecret)
        },
        body: "grant_type=client_credentials",
    })

    tokenData = await spotifyApiReq.json();
    console.log(tokenData.access_token);
    token = tokenData.access_token;
    return getArtistGenre();

};

//SPOTIFY API function to get artist details

async function getArtistGenre() {

    //FOR THE LOVE OF EVERYTHING CHANGE THIS STRING TO USERINPUT.VALUE

    let artistInput = "shakira";
    let spotifyArtistRequest = "https://api.spotify.com/v1/search?type=artist&q=" + artistInput + "&limit=5";

    let artistReq = await fetch(spotifyArtistRequest, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        }
    })

    savedArtistData = await artistReq.json();
    console.log(savedArtistData);
    artistGenre = savedArtistData.artists.items[0].genres[0];
}

//THIS EVENT LISTENER WILL NEED TO CHANGE TO THE FORM SUBMIT BUTTON WHEN WE CREATE THE USER INPUT FIELD

artistBtn.addEventListener("click", getToken)

// POKEMON API functions

// these variables may not end up being needed
// var typesObj = {
//     "bug": [],
//     "dark": [],
//     "dragon": [],
//     "electric": [],
//     "fairy": [],
//     "fighting": [],
//     "fire": [],
//     "flying": [],
//     "ghost": [],
//     "grass": [],
//     "ground": [],
//     "ice": [],
//     "normal": [],
//     "poison": [],
//     "psychic": [],
//     "rock": [],
//     "steel": [],
//     "water": [],
//     "random": []
// }

// variable to store pokemon data separately
var pokeName = [];
var pokeType = [];
var pokeEntry = [];

// set up empty pokemon object to push name, type and data thru later
var pokemonObj = {};

// connect to Pokemon API

// first call to pokéAPI: fetch data for all pokémon
function getPokeApi() {

    // add query 'limit=1126' to retrieve every pokémon (else it will retrieve 20 results at a time)
    var pokemonApiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=1126";

    fetch(pokemonApiUrl)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            } else {
                return response.json();
            }
        })
        .then(function (allPokemonData) {
            let pokemon = allPokemonData.results;

            // initial array to hold specific pokemon
            let selectedPokemon = [
                pokemon[401], // bug type: kricketune
                pokemon[570] // dark type: zoroark
            ];

            // loop thru each pokemon in array to get required info
            selectedPokemon.forEach(function (pokemon) {
                // pass on info to get the pokemon name
                getPokeName(pokemon.name);
                // pass on url data to function for grabbing type
                getPokeType(pokemon.url);
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}

// get the name of the pokemon
function getPokeName(name) {
    // grab the pokemon name and push it to pokeName array
    pokeName.push(name);
    // view the name array
    console.log("POKE NAME ARRAY:");
    console.log(pokeName);
}

// get the pokemon's type through second fetch call
function getPokeType(pokemonUrl) {
    // fetch data using pokemon.url
    fetch(pokemonUrl)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            } else {
                return response.json();
            }
        })
        .then(function(pokeData) {
            // first console.log to make sure our data has been correctly pulled
            console.log("url data: ");
            console.log(pokeData);

            // for readability, make a variable 'type' and assign it the fetched data
            var type = pokeData.types[0].type.name;
            // console log for good measure
            console.log("type");
            console.log(type);

            // push the type to the pokeType array
            pokeType.push(type);
            console.log("type as array");
            console.log(pokeType);
        })
        .catch(function (error) {
            console.log(error);
        })
}


getPokeApi();