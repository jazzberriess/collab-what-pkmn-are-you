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
            console.log(allPokemonData);
        })
        .catch(function (error) {
            console.log(error);
        });
}