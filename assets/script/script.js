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
    let spotifyArtistRequest = "https://api.spotify.com/v1/search?type=artist&q=" + artistInput;

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

// arrays to store pokemon data separately
var pokeName = [];  // for the pokemon name
var pokeType = [];  // for the pokemon typing
var pokeArtwork = []; // for the pokemon's official artwork url
var pokeEntry = []; // for the pokemon's species description

// set up empty pokemon object to push name, type and data thru later
var pokemonObj = {};

// CONNECT TO pokéAPI

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
                pokemon[570], // dark type: zoroark
                pokemon[380], // dragon type: latios
                pokemon[178], // electric type: mareep
                pokemon[699], // fairy type: sylveon
                pokemon[891], // fighting type: urshifu
                pokemon[725], // fire type: torracat
                pokemon[16], // flying type: pidgeotto
                pokemon[353], // ghost type: banette
                pokemon[406], // grass type: roserade
                pokemon[220], // ground type: piloswine
                pokemon[711], // ice type: bergmite
                pokemon[107], // normal type: lickitung
                pokemon[434], // poison type: skuntank
                pokemon[857], // psychic type: hatterene
                pokemon[525], // rock type: gigalith
                pokemon[305], // steel type: aggron
                pokemon[729], // water type: primarina
                pokemon[772], // random choice: silvally
            ];

            // loop thru each pokemon in array to get required info
            selectedPokemon.forEach(function (pokemon) {
                // pass on info to get the pokemon name
                getPokeName(pokemon.name);
                // pass on url data to function for grabbing type
                getPokeType(pokemon.url);
                // pass on url to function for grabbing species data
                getPokeSpecies(pokemon.url);
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
            // for readability, make a variable 'type' and assign it the fetched data
            var type = pokeData.types[0].type.name;

            // push the type to the pokeType array
            pokeType.push(type);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function getPokeSpecies(pokemonUrl) {
    // fetch data using pokemon.url
    fetch(pokemonUrl)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            } else {
                return response.json();
            }
        })
        .then(function (pokeData) {
            // grab url for official artwork
            var officialArt = pokeData.sprites.other["official-artwork"].front_default;
            // turn it into a string using template literals (template strings)
            var artUrl = `"${officialArt}"`;
            // pass art url on
            getPokeArt(artUrl);

            // grab species data url
            var species = pokeData.species.url;
            // pass it on to get flavour text
            getPokeFlavourText(species);
        })
        .catch(function (error) {
            console.log(error);
        });
}

// to get the official artwork img url
function getPokeArt(arturl) {
    console.log(arturl);
}

// to get the pokemon's pokedex entry (species flavour text)
function getPokeFlavourText(species) {
    console.log(species);
}


getPokeApi();