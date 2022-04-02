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

            // for each of the above items, grab the pokemon url and pass it on
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
            // get pokemon name
            let name = data.name;
            // get pokemon id number
            let id = data.id;

            // get pokemon artwork url by first retrieving data from pokeAPI
            let artLocation = data.sprites.other["official-artwork"].front_default;
            // make the url a string
            let artwork = `${artLocation}`;

            // get species data urls
            let species = data.species.url;

            // pass specified variables on to populate 'typeInfo' object
            fillPokemonDetails(typeInfo, name, id, artwork);
            getPokemonSpecies(typeInfo, species);

            console.log(typeInfo);

            // POKEMON LOGIC FUNCTION SHOULD PROBABLY BE ADDED HERE and typeInfo object passed to it
            // eg. determinePokeArtistMatch(typeInfo);

        })
        .catch(function (error) {
            console.log(error);
        });
}

// get the species url 
function getPokemonSpecies(typeobj, species) {
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
            // pass the results on to next function, to choose specific dex entry
            getEntry(typeobj, speciesdata);
        })
        .catch(function (error) {
            console.log(error);
        });
}

// retrieve specific Pokédex entry for each pokemon
function getEntry(typeobj, speciesdata) {
    // console.log(speciesdata);
    let pokemon = speciesdata.name;
    let entry = speciesdata.flavor_text_entries;

    // depending on the name of the pokemon,
    switch (pokemon) {
        // in this case 'kricketune'
        case "kricketune":
            // add to 'typeInfo' object under 'bug' key: flavour text entry #4
            typeobj.bug.entry = entry[3].flavor_text;
            break;
        // in this case 'zoroark'
        case "zoroark":
            // add to 'typeInfo' object under 'dark' key: flavour text entry #4
            typeobj.dark.entry = entry[3].flavor_text;
            break;
        // and so on
        case "latios":
            typeobj.dragon.entry = entry[2].flavor_text;
            break;
        case "mareep":
            typeobj.electric.entry = entry[5].flavor_text;
            break;
        case "sylveon":
            typeobj.fairy.entry = entry[6].flavor_text;
            break;

        case "urshifu":
            typeobj.fighting.entry = entry[7].flavor_text;
            break;
        case "torracat":
            typeobj.fire.entry = entry[58].flavor_text;
            break;
        case "pidgeotto":
            typeobj.flying.entry = entry[14].flavor_text;
            break;
        case "banette":
            typeobj.ghost.entry = entry[3].flavor_text;
            break;
        case "roserade":
            typeobj.grass.entry = entry[1].flavor_text;
            break;

        case "piloswine":
            typeobj.ground.entry = entry[6].flavor_text;
            break;
        case "bergmite":
            typeobj.ice.entry = entry[39].flavor_text;
            break;
        case "lickitung":
            typeobj.normal.entry = entry[9].flavor_text;
            break;
        case "skuntank":
            typeobj.poison.entry = entry[0].flavor_text;
            break;
        case "hatterene":
            typeobj.psychic.entry = entry[7].flavor_text;
            break;

        case "gigalith":
            typeobj.rock.entry = entry[1].flavor_text;
            break;
        case "aggron":
            typeobj.steel.entry = entry[2].flavor_text;
            break;
        case "primarina":
            typeobj.water.entry = entry[37].flavor_text;
            break;
        /* silvally as a case is commented out for now (the default case should be silvally) */
        // case "silvally": 
        //     typeobj.random.entry = entry[7].flavor_text;
        //     break;
        default:
            // the default case will use the pokemon Silvally
            pokemon = "silvally";
            // set value of 'random' key in object 'typeInfo' with flavour text entry #8
            typeobj.random.entry = entry[7].flavor_text;
            // console.log("default break at get-entry function");
            break;
    }
}

// this will fill 'typeInfo' object with three keys: poké name, poké ID no., poké artwork url
function fillPokemonDetails(typeobj, name, id, artwork) {
    let pokemon = name;
    // console.log(pokemon);

    // using the pokemon name as a determiner
    switch (pokemon) {
        // for the case of 'kricketune'
        case "kricketune":
            // add to typeInfo object under 'bug' key: name, id, artwork url values of kricketune
            typeobj.bug.name = name;
            typeobj.bug.id = id;
            typeobj.bug.artwork = artwork;
            break;
        // for the case of 'zoroark'
        case "zoroark":
            // add to typeInfo object under 'dark' key: name, id, artwork url values of zoroark
            typeobj.dark.name = name;
            typeobj.dark.id = id;
            typeobj.dark.artwork = artwork;
            break;
        // and so on
        case "latios":
            typeobj.dragon.name = name;
            typeobj.dragon.id = id;
            typeobj.dragon.artwork = artwork;
            break;
        case "mareep":
            typeobj.electric.name = name;
            typeobj.electric.id = id;
            typeobj.electric.artwork = artwork;
            break;
        case "sylveon":
            typeobj.fairy.name = name;
            typeobj.fairy.id = id;
            typeobj.fairy.artwork = artwork;
            break;

        // for urshifu's name, need to do some clipping
        case "urshifu-single-strike":
            // first split the name 'urshifu-single-strike' at the "-"
            let urshifu = name.split("-")[0];
            // add to 'fighting' key only the first part of the name (aka 'urshifu')
            typeobj.fighting.name = urshifu;
            typeobj.fighting.id = id;
            typeobj.fighting.artwork = artwork;
            break;
        case "torracat":
            typeobj.fire.name = name;
            typeobj.fire.id = id;
            typeobj.fire.artwork = artwork;
            break;
        case "pidgeotto":
            typeobj.flying.name = name;
            typeobj.flying.id = id;
            typeobj.flying.artwork = artwork;
            break;
        case "banette":
            typeobj.ghost.name = name;
            typeobj.ghost.id = id;
            typeobj.ghost.artwork = artwork;
            break;
        case "roserade":
            typeobj.grass.name = name;
            typeobj.grass.id = id;
            typeobj.grass.artwork = artwork;
            break;

        case "piloswine":
            typeobj.ground.name = name;
            typeobj.ground.id = id;
            typeobj.ground.artwork = artwork;
            break;
        case "bergmite":
            typeobj.ice.name = name;
            typeobj.ice.id = id;
            typeobj.ice.artwork = artwork;
            break;
        case "lickitung":
            typeobj.normal.name = name;
            typeobj.normal.id = id;
            typeobj.normal.artwork = artwork;
            break;
        case "skuntank":
            typeobj.poison.name = name;
            typeobj.poison.id = id;
            typeobj.poison.artwork = artwork;
            break;
        case "hatterene":
            typeobj.psychic.name = name;
            typeobj.psychic.id = id;
            typeobj.psychic.artwork = artwork;
            break;

        case "gigalith":
            typeobj.rock.name = name;
            typeobj.rock.id = id;
            typeobj.rock.artwork = artwork;
            break;
        case "aggron":
            typeobj.steel.name = name;
            typeobj.steel.id = id;
            typeobj.steel.artwork = artwork;
            break;
        case "primarina":
            typeobj.water.name = name;
            typeobj.water.id = id;
            typeobj.water.artwork = artwork;
            break;
        /* silvally as a case is commented out for now (the default case should be silvally) */
        // case "silvally": 
        //     typeobj.random.name = name;
        //     typeobj.random.id = id;
        //     typeobj.random.artwork = artwork;
        //     // console.log(typeobj);
        //     break;
        default:
            // set the default pokemon name to "silvally"
            pokemon = "silvally";
            // add silvally's name, ID, artwork url values to the 'random' key in typeInfo object
            typeobj.random.name = name;
            typeobj.random.id = id;
            typeobj.random.artwork = artwork;
            // console.log("default break at fill-details function");
            break;
    }
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
