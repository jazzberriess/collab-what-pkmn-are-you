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
    let artistInput = "ludovico einaudi";

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
            artistGenre = savedArtistData.artists.items[0].genres;
            console.log(artistGenre);
        })

        //catch any errors and console log them
        .catch(function (error) {
            console.log(error);
        });

}

// POKEMON API functions



// arrays to store pokemon data separately
var pokeName = [];  // for the pokemon name
var pokeType = [];  // for the pokemon typing
var pokeArtwork = []; // for the pokemon's official artwork url
var pokeEntry = []; // for the pokemon's flavour text

var pokeId = [];


var typeInfo = {
    "bug": { "name": {}, "id": {}, "artwork": {}, "entry": {} },
    "dark": { "name": {}, "id": {}, "artwork": {}, "entry": {} },
    "dragon": { "name": {}, "id": {}, "artwork": {}, "entry": {} },
    "electric": { "name": {}, "id": {}, "artwork": {}, "entry": {} },
    "fairy": { "name": {}, "id": {}, "artwork": {}, "entry": {} },
    "fighting": { "name": {}, "id": {}, "artwork": {}, "entry": {} },
    "fire": { "name": {}, "id": {}, "artwork": {}, "entry": {} },
    "flying": { "name": {}, "id": {}, "artwork": {}, "entry": {} },
    "ghost": { "name": {}, "id": {}, "artwork": {}, "entry": {} },
    "grass": { "name": {}, "id": {}, "artwork": {}, "entry": {} },
    "ground": { "name": {}, "id": {}, "artwork": {}, "entry": {} },
    "ice": { "name": {}, "id": {}, "artwork": {}, "entry": {} },
    "normal": { "name": {}, "id": {}, "artwork": {}, "entry": {} },
    "poison": { "name": {}, "id": {}, "artwork": {}, "entry": {} },
    "psychic": { "name": {}, "id": {}, "artwork": {}, "entry": {} },
    "rock": { "name": {}, "id": {}, "artwork": {}, "entry": {} },
    "steel": { "name": {}, "id": {}, "artwork": {}, "entry": {} },
    "water": { "name": {}, "id": {}, "artwork": {}, "entry": {} },
    "random": { "name": {}, "id": {}, "artwork": {}, "entry": {} }
}

// var typeInfo = {
//     "bug": { "name": {}, "id": {}, "type": {}, "entry": {} },
//     "dark": { "name": {}, "id": {}, "type": {}, "entry": {} },
//     "dragon": { "name": {}, "id": {}, "type": {}, "entry": {} },
//     "electric": { "name": {}, "id": {}, "type": {}, "entry": {} },
//     "fairy": { "name": {}, "id": {}, "type": {}, "entry": {} },
//     "fighting": { "name": {}, "id": {}, "type": {}, "entry": {} },
//     "fire": { "name": {}, "id": {}, "type": {}, "entry": {} },
//     "flying": { "name": {}, "id": {}, "type": {}, "entry": {} },
//     "ghost": { "name": {}, "id": {}, "type": {}, "entry": {} },
//     "grass": { "name": {}, "id": {}, "type": {}, "entry": {} },
//     "ground": { "name": {}, "id": {}, "type": {}, "entry": {} },
//     "ice": { "name": {}, "id": {}, "type": {}, "entry": {} },
//     "normal": { "name": {}, "id": {}, "type": {}, "entry": {} },
//     "poison": { "name": {}, "id": {}, "type": {}, "entry": {} },
//     "psychic": { "name": {}, "id": {}, "type": {}, "entry": {} },
//     "rock": { "name": {}, "id": {}, "type": {}, "entry": {} },
//     "steel": { "name": {}, "id": {}, "type": {}, "entry": {} },
//     "water": { "name": {}, "id": {}, "type": {}, "entry": {} },
//     "random": { "name": {}, "id": {}, "type": {}, "entry": {} }
// }

// // these variables may not end up being needed
// var typesObj = {
//     "bug": [pokeName[0], pokeId[0], pokeType[0], pokeArtwork[0]],
//     "dark": [pokeName[1], pokeId[1], pokeType[1], pokeArtwork[1]],
//     "dragon": [pokeName[2], pokeId[2], pokeType[2], pokeArtwork[2]],
//     "electric": [pokeName[3], pokeId[3], pokeType[3], pokeArtwork[3]],
//     "fairy": [pokeName[4], pokeId[4], pokeType[4], pokeArtwork[4]],
//     "fighting": [pokeName[5], pokeId[5], pokeType[5], pokeArtwork[5]],
//     "fire": [pokeName[6], pokeId[6], pokeType[6], pokeArtwork[6]],
//     "flying": [pokeName[7], pokeId[7], pokeType[7], pokeArtwork[7]],
//     "ghost": [pokeName[8], pokeId[8], pokeType[8], pokeArtwork[8]],
//     "grass": [pokeName[9], pokeId[9], pokeType[9], pokeArtwork[9]],
//     "ground": [pokeName[10], pokeId[10], pokeType[10], pokeArtwork[10]],
//     "ice": [pokeName[11], pokeId[11], pokeType[11], pokeArtwork[11]],
//     "normal": [pokeName[12], pokeId[12], pokeType[12], pokeArtwork[12]],
//     "poison": [pokeName[13], pokeId[13], pokeType[13], pokeArtwork[13]],
//     "psychic": [pokeName[14], pokeId[14], pokeType[14], pokeArtwork[14]],
//     "rock": [pokeName[15], pokeId[15], pokeType[15], pokeArtwork[15]],
//     "steel": [pokeName[16], pokeId[16], pokeType[16], pokeArtwork[16]],
//     "water": [pokeName[17], pokeId[17], pokeType[17], pokeArtwork[17]],
//     "random": [pokeName[18], pokeId[18], pokeType[18], pokeArtwork[18]]
// }

// set up empty pokemon object to push name, type and data thru later
// var pokemonObj = {};

// CONNECT TO pokéAPI


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

            selectedPokemon.forEach(function (pokemon) {
                getPokemonInfo(pokemon.url);
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}

function getPokemonInfo(url) {
    // console.log(url);
    fetch(url)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            } else {
                return response.json();
            }
        })
        .then(function (data) {
            // console.log(data);

            var name = data.name;
            getPokemonName(typeInfo, name);

            var id = data.id;
            getPokemonId(typeInfo, name, id);

            // var type = data.types[0].type.name;
            // getPokemonType(typeInfo, name, type);

            var artwork = "";
            var artLocation = data.sprites.other["official-artwork"].front_default;
            artwork += artLocation;
            getPokemonArt(typeInfo, name, artwork);

            var species = data.species.url;
            getPokemonSpecies(typeInfo, name, species);

            console.log("get pokemon info: ");
            console.log(typeInfo);

        })
        .catch(function (error) {
            console.log(error);
        });
}

function getPokemonName(typeobj, name) {
    let pokemon = name;

    switch (pokemon) {
        case "kricketune":
            typeobj.bug.name = name;
            // console.log(typeobj);
            break;
        case "zoroark":
            typeobj.dark.name = name;
            // console.log(typeobj);
            break;
        case "latios":
            typeobj.dragon.name = name;
            // console.log(typeobj);
            break;
        case "mareep":
            typeobj.electric.name = name;
            // console.log(typeobj);
            break;
        case "sylveon":
            typeobj.fairy.name = name;
            // console.log(typeobj);
            break;

        case "urshifu-single-strike":
            let urshifu = name.split("-")[0];
            typeobj.fighting.name = urshifu;
            // console.log(typeobj);
            break;
        case "torracat":
            typeobj.fire.name = name;
            // console.log(typeobj);
            break;
        case "pidgeotto":
            typeobj.flying.name = name;
            // console.log(typeobj);
            break;
        case "banette":
            typeobj.ghost.name = name;
            // console.log(typeobj);
            break;
        case "roserade":
            typeobj.grass.name = name;
            // console.log(typeobj);
            break;

        case "piloswine":
            typeobj.ground.name = name;
            // console.log(typeobj);
            break;
        case "bergmite":
            typeobj.ice.name = name;
            // console.log(typeobj);
            break;
        case "lickitung":
            typeobj.normal.name = name;
            // console.log(typeobj);
            break;
        case "skuntank":
            typeobj.poison.name = name;
            // console.log(typeobj);
            break;
        case "hatterene":
            typeobj.psychic.name = name;
            // console.log(typeobj);
            break;

        case "gigalith":
            typeobj.rock.name = name;
            // console.log(typeobj);
            break;
        case "aggron":
            typeobj.steel.name = name;
            // console.log(typeobj);
            break;
        case "primarina":
            typeobj.water.name = name;
            // console.log(typeobj);
            break;
        case "silvally":
            typeobj.random.name = name;
            // console.log(typeobj);
            break;
        default: 
            console.log("default break: nothing");
            break;
    }
}

function getPokemonId(typeobj, name, id) {
    let pokemon = name;

    switch (pokemon) {
        case "kricketune":
            typeobj.bug.id = id;
            // console.log(typeobj);
            break;
        case "zoroark":
            typeobj.dark.id = id;
            // console.log(typeobj);
            break;
        case "latios":
            typeobj.dragon.id = id;
            // console.log(typeobj);
            break;
        case "mareep":
            typeobj.electric.id = id;
            // console.log(typeobj);
            break;
        case "sylveon":
            typeobj.fairy.id = id;
            // console.log(typeobj);
            break;

        case "urshifu-single-strike":
            typeobj.fighting.id = id;
            // console.log(typeobj);
            break;
        case "torracat":
            typeobj.fire.id = id;
            // console.log(typeobj);
            break;
        case "pidgeotto":
            typeobj.flying.id = id;
            // console.log(typeobj);
            break;
        case "banette":
            typeobj.ghost.id = id;
            // console.log(typeobj);
            break;
        case "roserade":
            typeobj.grass.id = id;
            // console.log(typeobj);
            break;

        case "piloswine":
            typeobj.ground.id = id;
            // console.log(typeobj);
            break;
        case "bergmite":
            typeobj.ice.id = id;
            // console.log(typeobj);
            break;
        case "lickitung":
            typeobj.normal.id = id;
            // console.log(typeobj);
            break;
        case "skuntank":
            typeobj.poison.id = id;
            // console.log(typeobj);
            break;
        case "hatterene":
            typeobj.psychic.id = id;
            // console.log(typeobj);
            break;

        case "gigalith":
            typeobj.rock.id = id;
            // console.log(typeobj);
            break;
        case "aggron":
            typeobj.steel.id = id;
            // console.log(typeobj);
            break;
        case "primarina":
            typeobj.water.id = id;
            // console.log(typeobj);
            break;
        case "silvally": 
            typeobj.random.id = id;
            // console.log(typeobj);
            break;
        default:
            console.log("default break: nothing");
            break;
    }
}

// function getPokemonType here (don't actually need it)
/*
function getPokemonType(typeobj, name, type) {
    let pokemon = name;

    switch (pokemon) {
        case "kricketune":
            typeobj.bug.type = type;
            console.log(typeobj);
            break;
        case "zoroark":
            typeobj.dark.type = type;
            console.log(typeobj);
            break;
        case "latios":
            typeobj.dragon.type = type;
            console.log(typeobj);
            break;
        case "mareep":
            typeobj.electric.type = type;
            console.log(typeobj);
            break;
        case "sylveon":
            typeobj.fairy.type = type;
            console.log(typeobj);
            break;

        case "urshifu-single-strike":
            typeobj.fighting.type = type;
            console.log(typeobj);
            break;
        case "torracat":
            typeobj.fire.type = type;
            console.log(typeobj);
            break;
        case "ptypegeotto":
            typeobj.flying.type = type;
            console.log(typeobj);
            break;
        case "banette":
            typeobj.ghost.type = type;
            console.log(typeobj);
            break;
        case "roserade":
            typeobj.grass.type = type;
            console.log(typeobj);
            break;

        case "piloswine":
            typeobj.ground.type = type;
            console.log(typeobj);
            break;
        case "bergmite":
            typeobj.ice.type = type;
            console.log(typeobj);
            break;
        case "lickitung":
            typeobj.normal.type = type;
            console.log(typeobj);
            break;
        case "skuntank":
            typeobj.poison.type = type;
            console.log(typeobj);
            break;
        case "hatterene":
            typeobj.psychic.type = type;
            console.log(typeobj);
            break;

        case "gigalith":
            typeobj.rock.type = type;
            console.log(typeobj);
            break;
        case "aggron":
            typeobj.steel.type = type;
            console.log(typeobj);
            break;
        case "primarina":
            typeobj.water.type = type;
            console.log(typeobj);
            break;
        case "silvally": 
            typeobj.random.type = type;
            console.log(typeobj);
            break;
        default:
            console.log("default break: nothing");
            break;
    }
}
*/

function getPokemonArt(typeobj, name, artwork) {
    let pokemon = name;

    switch (pokemon) {
        case "kricketune":
            typeobj.bug.artwork = artwork;
            // console.log(typeobj);
            break;
        case "zoroark":
            typeobj.dark.artwork = artwork;
            // console.log(typeobj);
            break;
        case "latios":
            typeobj.dragon.artwork = artwork;
            // console.log(typeobj);
            break;
        case "mareep":
            typeobj.electric.artwork = artwork;
            // console.log(typeobj);
            break;
        case "sylveon":
            typeobj.fairy.artwork = artwork;
            // console.log(typeobj);
            break;

        case "urshifu-single-strike":
            typeobj.fighting.artwork = artwork;
            // console.log(typeobj);
            break;
        case "torracat":
            typeobj.fire.artwork = artwork;
            // console.log(typeobj);
            break;
        case "partworkgeotto":
            typeobj.flying.artwork = artwork;
            // console.log(typeobj);
            break;
        case "banette":
            typeobj.ghost.artwork = artwork;
            // console.log(typeobj);
            break;
        case "roserade":
            typeobj.grass.artwork = artwork;
            // console.log(typeobj);
            break;

        case "piloswine":
            typeobj.ground.artwork = artwork;
            // console.log(typeobj);
            break;
        case "bergmite":
            typeobj.ice.artwork = artwork;
            // console.log(typeobj);
            break;
        case "lickitung":
            typeobj.normal.artwork = artwork;
            // console.log(typeobj);
            break;
        case "skuntank":
            typeobj.poison.artwork = artwork;
            // console.log(typeobj);
            break;
        case "hatterene":
            typeobj.psychic.artwork = artwork;
            // console.log(typeobj);
            break;

        case "gigalith":
            typeobj.rock.artwork = artwork;
            // console.log(typeobj);
            break;
        case "aggron":
            typeobj.steel.artwork = artwork;
            // console.log(typeobj);
            break;
        case "primarina":
            typeobj.water.artwork = artwork;
            // console.log(typeobj);
            break;
        case "silvally": 
            typeobj.random.artwork = artwork;
            // console.log(typeobj);
            break;
        default:
            console.log("default break: nothing");
            break;
    }
}

function getPokemonSpecies(typeobj, name, species) {
    // console.log(url);
    fetch(species)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            } else {
                return response.json();
            }
        })
        .then(function (speciesdata) {
            // console.log(speciesdata);
            getEntry(typeobj, name, speciesdata);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function getEntry(typeobj, name, speciesdata) {
    let entry = speciesdata.flavor_text_entries;
    let pokemon = name;

    switch (pokemon) {
        case "kricketune":
            typeobj.bug.entry = entry[3].flavor_text;
            // console.log(typeobj);
            break;
        case "zoroark":
            typeobj.dark.entry = entry[3].flavor_text;
            // console.log(typeobj);
            break;
        case "latios":
            typeobj.dragon.entry = entry[2].flavor_text;
            // console.log(typeobj);
            break;
        case "mareep":
            typeobj.electric.entry = entry[5].flavor_text;
            // console.log(typeobj);
            break;
        case "sylveon":
            typeobj.fairy.entry = entry[6].flavor_text;
            // console.log(typeobj);
            break;

        case "urshifu-single-strike":
            typeobj.fighting.entry = entry[7].flavor_text;
            // console.log(typeobj);
            break;
        case "torracat":
            typeobj.fire.entry = entry[58].flavor_text;
            // console.log(typeobj);
            break;
        case "pentrygeotto":
            typeobj.flying.entry = entry[14].flavor_text;
            // console.log(typeobj);
            break;
        case "banette":
            typeobj.ghost.entry = entry[3].flavor_text;
            // console.log(typeobj);
            break;
        case "roserade":
            typeobj.grass.entry = entry[1].flavor_text;
            // console.log(typeobj);
            break;

        case "piloswine":
            typeobj.ground.entry = entry[6].flavor_text;
            // console.log(typeobj);
            break;
        case "bergmite":
            typeobj.ice.entry = entry[39].flavor_text;
            // console.log(typeobj);
            break;
        case "lickitung":
            typeobj.normal.entry = entry[9].flavor_text;
            // console.log(typeobj);
            break;
        case "skuntank":
            typeobj.poison.entry = entry[0].flavor_text;
            // console.log(typeobj);
            break;
        case "hatterene":
            typeobj.psychic.entry = entry[7].flavor_text;
            // console.log(typeobj);
            break;

        case "gigalith":
            typeobj.rock.entry = entry[1].flavor_text;
            // console.log(typeobj);
            break;
        case "aggron":
            typeobj.steel.entry = entry[2].flavor_text;
            // console.log(typeobj);
            break;
        case "primarina":
            typeobj.water.entry = entry[37].flavor_text;
            // console.log(typeobj);
            break;
        case "silvally": 
            typeobj.random.entry = entry[7].flavor_text;
            // console.log(typeobj);
            break;
        default:
            console.log("default break: nothing");
            break;
    }
}

getPokeApi();


/* 
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
                fetchPokeSpecies(pokemon.url);
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

    // making it so Urshifu's name is only "Urshifu" and not "Urshifu-single-strike"
    if (name.includes("urshifu")) {
        // grab name that includes "urshifu", split it by "-" and target index 0 ("urshifu")
        var urshifu = name.split("-")[0];
        // delete "urshifu-single-strike" from the name array
        pokeName.pop();
        // add just "urshifu" back into the name array
        pokeName.push(urshifu);
    }
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
        .then(function(urlData) {
            // for readability, make a variable 'type' and assign it the fetched data
            var type = urlData.types[0].type.name;
            // push the type to the pokeType array
            pokeType.push(type);
        })
        .catch(function (error) {
            console.log(error);
        });
}

// get pokemon species data which will include official artwork url and another link to retrieve flavour text
function fetchPokeSpecies(pokemonUrl) {
    // fetch data using pokemon.url
    fetch(pokemonUrl)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            } else {
                return response.json();
            }
        })
        .then(function (urlData) {
            // set an empty string
            var artUrl = "";
            // grab url for official artwork
            var officialArt = urlData.sprites.other["official-artwork"].front_default;
            // add the retrieved url to the empty string
            artUrl += officialArt;

            // pass art url on
            getPokeArt(artUrl);

            // grab each species' data url
            var species = urlData.species.url;
            // pass it on to get flavour text
            fetchPokeFlavourText(species);
        })
        .catch(function (error) {
            console.log(error);
        });
}

// to get the official artwork img url
function getPokeArt(arturl) {
    // get the artwork url and push it to pokeArtwork array
    pokeArtwork.push(arturl);
    console.log(arturl);
}

// to get the pokemon's pokedex entry (species flavour text)
function fetchPokeFlavourText(species) {
    fetch(species)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            } else {
                return response.json();
            }
        })
        .then(function (speciesData) {
            // pass on all species data to next function
            assignPokeEntry(speciesData);
        })
        .catch(function (error) {
            console.log(error);
        });

}

// IMPORTANT NOTE: because there are a lot of different flavour text entries available for each pokemon (and a number of them are in languages other than English), and because not all entries assigned to the first index of flavour_text_entries are in English, it's important to be able to select the specific flavour text we want

// pick the specific flavour text to use for each pokemon
function assignPokeEntry(speciesdata) {
    // target the name of pokemon to enable switch case usage
    let name = speciesdata.name;
    // let unorderedPokeEntry = [];
    // let index = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

    
    //     if (name.includes("kricketune")) {
    //         unorderedPokeEntry[1].push("kricketune " + speciesdata.flavor_text_entries[3].flavor_text);
    //     }

    //     if (name.includes("zoroark")) {
    //         unorderedPokeEntry[2].push(speciesdata.flavor_text_entries[3].flavor_text);
    //     }

    //     if (name.includes("latios")) {
    //         unorderedPokeEntry[3].push(speciesdata.flavor_text_entries[2].flavor_text);
    //     }

    //     if (name.includes("mareep")) {
    //         unorderedPokeEntry[4].push(speciesdata.flavor_text_entries[5].flavor_text);
    //     }

    //     if (name.includes("sylveon")) {
    //         unorderedPokeEntry[5].push(speciesdata.flavor_text_entries[6].flavor_text);
    //     }

    //     if (name.includes("urshifu")) {
    //         unorderedPokeEntry[6].push(speciesdata.flavor_text_entries[7].flavor_text);
    //     }

    //     console.log(unorderedPokeEntry);
    //     return unorderedPokeEntry;
    // }
}

getPokeApi();

*/

//THIS EVENT LISTENER WILL NEED TO CHANGE TO THE FORM SUBMIT BUTTON WHEN WE CREATE THE USER INPUT FIELD
artistBtn.addEventListener("click", getSpotifyToken)