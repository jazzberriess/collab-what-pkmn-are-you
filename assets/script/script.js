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
            selectedPokemon.forEach(function(pokemon) {
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