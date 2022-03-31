
function grabPokeData() {

    var pokemonApiUrl = "https://pokeapi.co/api/v2/pokemon/";

    fetch(pokemonApiUrl)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            } else {
                return response.json();
            }
        })
        .then(function (data) {
            console.log(data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

grabPokeData();
