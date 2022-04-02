//SPOTIFY API functions

//setting global varaibles for the SpotifyAPI so we can access the retrieved json data in other functions

let savedArtistData = [];

let artistGenre = "";

//CHANGE THIS TO THE USERINPUT FORM SUBMIT BUTTON - THIS IS ONLY TEMPORARY TO INITIATE THE SPOTIFY API CALL
let artistBtn = document.getElementById("temporary-start-button");


//SPOTIFY API function to obtain authorisation token

function getSpotifyToken() {

    //client ID's required to create token to access the Spotify API
    let clientId = "01c9a8e4c05447c697c5bc044cb8d512";
    let clientSecret = "cef744acfdb142c68f81d49f01f6a6b7";

    //URL for the spotify API token
    let apiTokenReq = "https://accounts.spotify.com/api/token";

    //fetch request to create the authorisation token for spotify API
    fetch(apiTokenReq, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic " + btoa(clientId + ":" + clientSecret)
        },
        body: "grant_type=client_credentials",
    })
        //retrieve the API response
        .then(function (response) {

            //if there is an error, throw the response
            if (!response.ok) {
                throw response.json();

                //else return the response as a json file
            } else {
                console.log(response);
                return response.json();
            }
        })

        //then take the token from the response data
        .then(function (token) {
            console.log(token);

            let accessToken = token.access_token;

            //and run the getArtistData function, pass the accessToken to next function
            getArtistData(accessToken);
        })

        //catch any errors and console log them
        .catch(function (error) {
            console.log(error);
        });

}

//SPOTIFY API function to obtain artist details based on user input

function getArtistData(accessToken) {

    //FOR THE LOVE OF EVERYTHING CHANGE THIS STRING TO USERINPUT.VALUE
    let artistInput = "mozart";

    //URL for the artist search via the spotify API - limit the search query to five results
    let spotifyArtistSearch = "https://api.spotify.com/v1/search?type=artist&q=" + artistInput + "&limit=5";

    //fetch request for artist Data
    fetch(spotifyArtistSearch, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken,
        }
    })
        //retrieve the API response
        .then(function (response) {

            //if there is an error, throw the response
            if (!response.ok) {
                throw response.json();

                //else return the response as a json file
            } else {
                console.log(response);
                return response.json();
            }
        })
        //then take the artistData from the response data
        .then(function (artistData) {

            //save the returned artistData to an empty global object to use in future functions
            savedArtistData = artistData;
            console.log(savedArtistData);

            //save the artistGenre details to an empty global object to use in future functions
            artistGenre = savedArtistData.artists.items[0].genres[0];
            console.log(artistGenre);

            generatePkmn();
        })

        //catch any errors and console log them
        .catch(function (error) {
            console.log(error);
        });

}

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
        .then(function (pokeData) {
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

//GENERATE YOUR POKEMON function

function generatePkmn() {


    if (artistGenre.includes("pop")) {
        console.log("the pokemon is " + "FAIRY");

    } else if (artistGenre.includes("country")) {
        console.log("the pokemon is " + "GRASS");

    } else if (artistGenre.includes("jazz")) {
        console.log("the pokemon is " + "FIRE");

    } else if (artistGenre.includes("ambient")) {
        console.log("the pokemon is " + "WATER");

    } else if (artistGenre.includes("easy")) {
        console.log("the pokemon is " + "NORMAL");

    } else if (artistGenre.includes("orchestra")) {
        console.log("the pokemon is " + "FLYING");

    } else if (artistGenre.includes("blues")) {
        console.log("the pokemon is " + "BUG");

    } else if (artistGenre.includes("rock")) {
        console.log("the pokemon is " + "ROCK");

    } else if (artistGenre.includes("folk")) {
        console.log("the pokemon is " + "GROUND");

    } else if (artistGenre.includes("punk")) {
        console.log("the pokemon is " + "POISON");

    } else if (artistGenre.includes("dance")) {
        console.log("the pokemon is " + "ELECTRIC");

    } else if (artistGenre.includes("R&B") || artistGenre.includes("rhythm") || artistGenre.includes("hip hop")) {
        console.log("the pokemon is " + "FIGHTING");

    } else if (artistGenre.includes("new age")) {
        console.log("the pokemon is " + "PSYCHIC");

    } else if (artistGenre.includes("soul") || artistGenre.includes("religious")) {
        console.log("the pokemon is " + "GHOST");

    } else if (artistGenre.includes("chill-out") || artistGenre.includes("lo-fi")) {
        console.log("the pokemon is " + "ICE");

    } else if (artistGenre.includes("classical")) {
        console.log("the pokemon is " + "DRAGON");

    } else if (artistGenre.includes("metal")) {
        console.log("the pokemon is " + "STEEL");

    } else if (artistGenre.includes("punk")) {
        console.log("the pokemon is " + "DARK");

    } else {
        console.log("the pokemon is " + "RANDOM");

    }

}

//THIS EVENT LISTENER WILL NEED TO CHANGE TO THE FORM SUBMIT BUTTON WHEN WE CREATE THE USER INPUT FIELD
artistBtn.addEventListener("click", getSpotifyToken)
