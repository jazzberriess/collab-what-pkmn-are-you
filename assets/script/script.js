// POKEMON API functions

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

            let selectedPokemon = [
                pokemon[401], // bug type: kricketune
                pokemon[570] // dark type: zoroark
            ];

            console.log("2. selected pokemon array:");
            console.log(selectedPokemon);

            selectedPokemon.forEach(function(pokemon) {
                // pass info on
                getPokeData(pokemon);
            })  

            
        })
        .catch(function (error) {
            console.log(error);
        });
}

var types = {
    "bug": [],
    "dark": [],
    "dragon": [],
    "electric": [],
    "fairy": [],
    "fighting": [],
    "fire": [],
    "flying": [],
    "ghost": [],
    "grass": [],
    "ground": [],
    "ice": [],
    "normal": [],
    "poison": [],
    "psychic": [],
    "rock": [],
    "steel": [],
    "water": [],
    "random": []
}

function getPokeData(pokemon) {
    console.log("3. get poke data function:");
    console.log(pokemon);

    let url = pokemon.url;

    console.log("4. pokemon url");
    console.log(url);
}


getPokeApi();