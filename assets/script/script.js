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
            // console.log returned results to view all creatures
            console.log("1. all pokemon data:");
            console.log(allPokemonData);

            let pokemon = allPokemonData.results;

            // initial array to hold specific pokemon
            let selectedPokemon = [
                pokemon[401], // bug type: kricketune
                pokemon[570] // dark type: zoroark
            ];
            // view the selected pokemon array
            console.log("2. selected pokemon array:");
            console.log(selectedPokemon);

            // loop thru each pokemon in array to get required info
            selectedPokemon.forEach(function(pokemon) {
                // pass on info to get the pokemon name
                getPokeName(pokemon.name);
                // pass on url data to next function
                getPokeData(pokemon.url);
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

// get the url of the pokemon (for further data extrapolation)
function getPokeData(pokemonUrl) {
    console.log("3. get poke data function:");
    console.log(pokemonUrl);

    console.log("4. pokemon url");
    console.log(pokemonUrl);

    fetch(pokemonUrl)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            } else {
                return response.json();
            }
        })
        .then(function(data) {
            console.log(data);
        })
        .catch(function (error) {
            console.log(error);
        })

}


getPokeApi();