// MODAL functions

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


//SPOTIFY API functions

//setting global varaibles for the SpotifyAPI so we can access the retrieved json data in other functions

let savedArtistData = [];

let artistGenre = "";

let userInput = document.getElementById("user-input");

let artistInput = "";

    //variable to store the generated pokemon data in so we can then create the elements to display the information
    let yourPkmn = "";

let tempDisplay = document.getElementById("results-display");

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
                // console.log(response);
                return response.json();
            }
        })

        //then take the token from the response data
        .then(function (token) {
            // console.log(token);

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
    artistInput = userInput.value;

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
                // console.log(response);
                return response.json();
            }
        })
        //then take the artistData from the response data
        .then(function (artistData) {

            //save the returned artistData to an empty global object to use in future functions
            savedArtistData = artistData;
            // console.log(savedArtistData);

            //save the artistGenre details to an empty global object to use in future functions
            artistGenre = savedArtistData.artists.items[0].genres[0];
            console.log(artistGenre);

            generatePkmn();

        })

        //catch any errors and console log them
        .catch(function (error) {
            console.log(error);

            //display please try again message to user
            let errorText = document.createElement("p");
            errorText.textContent = "Sorry! We couldn't find that artist. Try again."
            tempDisplay.appendChild(errorText);

        });

}

// POKEMON API functions

// full type list
// { key: name, id, artwork, entry, type, ability }
var typeInfo = {
    "bug": { "name": {}, "id": {}, "artwork": {}, "entry": {}, "type": {}, "ability": {} },
    "dark": { "name": {}, "id": {}, "artwork": {}, "entry": {}, "type": {}, "ability": {} },
    "dragon": { "name": {}, "id": {}, "artwork": {}, "entry": {}, "type": {}, "ability": {} },
    "electric": { "name": {}, "id": {}, "artwork": {}, "entry": {}, "type": {}, "ability": {} },
    "fairy": { "name": {}, "id": {}, "artwork": {}, "entry": {}, "type": {}, "ability": {} },
    "fighting": { "name": {}, "id": {}, "artwork": {}, "entry": {}, "type": {}, "ability": {} },
    "fire": { "name": {}, "id": {}, "artwork": {}, "entry": {}, "type": {}, "ability": {} },
    "flying": { "name": {}, "id": {}, "artwork": {}, "entry": {}, "type": {}, "ability": {} },
    "ghost": { "name": {}, "id": {}, "artwork": {}, "entry": {}, "type": {}, "ability": {} },
    "grass": { "name": {}, "id": {}, "artwork": {}, "entry": {}, "type": {}, "ability": {} },
    "ground": { "name": {}, "id": {}, "artwork": {}, "entry": {}, "type": {}, "ability": {} },
    "ice": { "name": {}, "id": {}, "artwork": {}, "entry": {}, "type": {}, "ability": {} },
    "normal": { "name": {}, "id": {}, "artwork": {}, "entry": {}, "type": {}, "ability": {} },
    "poison": { "name": {}, "id": {}, "artwork": {}, "entry": {}, "type": {}, "ability": {} },
    "psychic": { "name": {}, "id": {}, "artwork": {}, "entry": {}, "type": {}, "ability": {} },
    "rock": { "name": {}, "id": {}, "artwork": {}, "entry": {}, "type": {}, "ability": {} },
    "steel": { "name": {}, "id": {}, "artwork": {}, "entry": {}, "type": {}, "ability": {} },
    "water": { "name": {}, "id": {}, "artwork": {}, "entry": {}, "type": {}, "ability": {} },
    "random": { "name": {}, "id": {}, "artwork": {}, "entry": {}, "type": {}, "ability": {} }
}

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
                pokemon[548], // grass type: lilligant
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

            // using for loop, send each pokemon info on
            for (var i = 0; i < selectedPokemon.length; i++) {
                getPokemonInfo(selectedPokemon[i].url);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

// get the pokemon url
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

            // get pokemon type (base array)
            let type = data.types;
            // get pokemon abilities (base array)
            let ability = data.abilities;

            // get species data urls
            let species = data.species.url;

            // pass specified variables on to populate 'typeInfo' object
            fillPokemonDetails(typeInfo, name, id, artwork, type, ability);
            getPokemonSpecies(typeInfo, species);

            // console.log(typeInfo);

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
        case "lilligant":
            typeobj.grass.entry = entry[45].flavor_text;
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
function fillPokemonDetails(typeobj, name, id, artwork, type, ability) {
    let pokemon = name;
    // console.log(pokemon);

    // using the pokemon name as a determiner
    switch (pokemon) {
        // for the case of 'kricketune'
        case "kricketune":
            // add to typeInfo object under 'bug' key: name, id, artwork url values of kricketune
            typeobj.bug.name = capitaliseFirstLetter(name);
            typeobj.bug.id = id;
            typeobj.bug.artwork = artwork;
            typeobj.bug.type = capitaliseFirstLetter(type[0].type.name);
            typeobj.bug.ability = capitaliseFirstLetter(ability[1].ability.name);
            // console.log(typeobj.bug.ability);
            break;

        // for the case of 'zoroark'
        case "zoroark":
            // add to typeInfo object under 'dark' key: name, id, artwork url values of zoroark
            typeobj.dark.name = capitaliseFirstLetter(name);
            typeobj.dark.id = id;
            typeobj.dark.artwork = artwork;
            typeobj.dark.type = capitaliseFirstLetter(type[0].type.name);
            typeobj.dark.ability = capitaliseFirstLetter(ability[0].ability.name);
            // console.log(typeobj.dark.ability);
            break;

        // and so on
        case "latios":
            typeobj.dragon.name = capitaliseFirstLetter(name);
            typeobj.dragon.id = id;
            typeobj.dragon.artwork = artwork;
            typeobj.dragon.type = capitaliseFirstLetter(type[0].type.name);
            typeobj.dragon.ability = capitaliseFirstLetter(ability[0].ability.name);
            // console.log(typeobj.dragon.ability);
            break;

        case "mareep":
            typeobj.electric.name = capitaliseFirstLetter(name);
            typeobj.electric.id = id;
            typeobj.electric.artwork = artwork;
            typeobj.electric.type = capitaliseFirstLetter(type[0].type.name);
            typeobj.electric.ability = capitaliseFirstLetter(ability[0].ability.name);
            // console.log(typeobj.electric.ability);
            break;

        case "sylveon":
            typeobj.fairy.name = capitaliseFirstLetter(name);
            typeobj.fairy.id = id;
            typeobj.fairy.artwork = artwork;
            typeobj.fairy.type = capitaliseFirstLetter(type[0].type.name);
            // sylveon's ability is retrieved as "cute-charm"; prettify it
            typeobj.fairy.ability = prettify(ability[0].ability.name);
            // console.log(typeobj.fairy.ability);
            break;

        // for urshifu's name, need to do some clipping
        case "urshifu-single-strike":
            // first split the name 'urshifu-single-strike' at the "-"
            let urshifu = name.split("-")[0];
            // add to 'fighting' key only the first part of the name (aka 'urshifu')
            typeobj.fighting.name = capitaliseFirstLetter(urshifu);
            typeobj.fighting.id = id;
            typeobj.fighting.artwork = artwork;
            typeobj.fighting.type = capitaliseFirstLetter(type[0].type.name);
            // urshifu's ability is retrieved as "unseen-fist"; prettify it
            typeobj.fighting.ability = prettify(ability[0].ability.name);
            // console.log(typeobj.fighting.ability);
            break;

        case "torracat":
            typeobj.fire.name = capitaliseFirstLetter(name);
            typeobj.fire.id = id;
            typeobj.fire.artwork = artwork;
            typeobj.fire.type = capitaliseFirstLetter(type[0].type.name);
            typeobj.fire.ability = capitaliseFirstLetter(ability[0].ability.name);
            // console.log(typeobj.fire.ability);
            break;

        case "pidgeotto":
            typeobj.flying.name = capitaliseFirstLetter(name);
            typeobj.flying.id = id;
            typeobj.flying.artwork = artwork;
            typeobj.flying.type = capitaliseFirstLetter(type[1].type.name);
            // pidgeotto's ability is retrieved as "keen-eye"; prettify it
            typeobj.flying.ability = prettify(ability[0].ability.name);
            // console.log(typeobj.flying.ability);
            break;

        case "banette":
            typeobj.ghost.name = capitaliseFirstLetter(name);
            typeobj.ghost.id = id;
            typeobj.ghost.artwork = artwork;
            typeobj.ghost.type = capitaliseFirstLetter(type[0].type.name);
            typeobj.ghost.ability = capitaliseFirstLetter(ability[0].ability.name);
            // console.log(typeobj.ghost.ability);
            break;

        case "lilligant":
            typeobj.grass.name = capitaliseFirstLetter(name);
            typeobj.grass.id = id;
            typeobj.grass.artwork = artwork;
            typeobj.grass.type = capitaliseFirstLetter(type[0].type.name);
            // lilligant's ability is retrieved as "own-tempo"; prettify it
            typeobj.grass.ability = prettify(ability[1].ability.name);
            // console.log(typeobj.grass.ability);
            break;

        case "piloswine":
            typeobj.ground.name = capitaliseFirstLetter(name);
            typeobj.ground.id = id;
            typeobj.ground.artwork = artwork;
            typeobj.ground.type = capitaliseFirstLetter(type[1].type.name);
            typeobj.ground.ability = capitaliseFirstLetter(ability[0].ability.name);
            // console.log(typeobj.ground.ability);
            break;

        case "bergmite":
            typeobj.ice.name = capitaliseFirstLetter(name);
            typeobj.ice.id = id;
            typeobj.ice.artwork = artwork;
            typeobj.ice.type = capitaliseFirstLetter(type[0].type.name);
            // bergmite's ability is retrieved as "ice-body"; prettify it
            typeobj.ice.ability = prettify(ability[1].ability.name);
            // console.log(typeobj.ice.ability);
            break;

        case "lickitung":
            typeobj.normal.name = capitaliseFirstLetter(name);
            typeobj.normal.id = id;
            typeobj.normal.artwork = artwork;
            typeobj.normal.type = capitaliseFirstLetter(type[0].type.name);
            // lickitung's ability is retrieved as "cloud-nine"; prettify it
            typeobj.normal.ability = prettify(ability[2].ability.name);
            // console.log(typeobj.normal.ability);
            break;

        case "skuntank":
            typeobj.poison.name = capitaliseFirstLetter(name);
            typeobj.poison.id = id;
            typeobj.poison.artwork = artwork;
            typeobj.poison.type = capitaliseFirstLetter(type[0].type.name);
            typeobj.poison.ability = capitaliseFirstLetter(ability[1].ability.name);
            // console.log(typeobj.poison.ability);
            break;

        case "hatterene":
            typeobj.psychic.name = capitaliseFirstLetter(name);
            typeobj.psychic.id = id;
            typeobj.psychic.artwork = artwork;
            typeobj.psychic.type = capitaliseFirstLetter(type[0].type.name);
            // hatterene's ability is retrieved as "magic-bounce"; prettify it
            typeobj.psychic.ability = prettify(ability[2].ability.name);
            // console.log(typeobj.psychic.ability);
            break;

        case "gigalith":
            typeobj.rock.name = capitaliseFirstLetter(name);
            typeobj.rock.id = id;
            typeobj.rock.artwork = artwork;
            typeobj.rock.type = capitaliseFirstLetter(type[0].type.name);
            typeobj.rock.ability = capitaliseFirstLetter(ability[0].ability.name);
            // console.log(typeobj.rock.ability);
            break;

        case "aggron":
            typeobj.steel.name = capitaliseFirstLetter(name);
            typeobj.steel.id = id;
            typeobj.steel.artwork = artwork;
            typeobj.steel.type = capitaliseFirstLetter(type[0].type.name);
            // aggron's ability is retrieved as "rock-head"; prettify it
            typeobj.steel.ability = prettify(ability[1].ability.name);
            // console.log(typeobj.steel.ability);
            break;

        case "primarina":
            typeobj.water.name = capitaliseFirstLetter(name);
            typeobj.water.id = id;
            typeobj.water.artwork = artwork;
            typeobj.water.type = capitaliseFirstLetter(type[0].type.name);
            // primarina's ability is retrieved as "liquid-voice"; prettify it
            typeobj.water.ability = prettify(ability[1].ability.name);
            // console.log(typeobj.water.ability);
            break;

        /* silvally as a case is commented out for now (the default case should be silvally) */
        // case "silvally": 
        //     typeobj.random.name = capitaliseFirstLetter(name);
        //     typeobj.random.id = id;
        //     typeobj.random.artwork = artwork;
        //     typeobj.random.type = capitaliseFirstLetter(type[0].type.name);
        //     silvally's ability is retrieved as "rks-system"; prettify it
        //     typeobj.random.ability = prettify(ability[0].ability.name);
        //     // console.log(typeobj.random.ability);
        //     break;

        default:
            // set the default pokemon name to "silvally"
            pokemon = "silvally";
            // add silvally's name, ID, artwork url values to the 'random' key in typeInfo object
            typeobj.random.name = capitaliseFirstLetter(name);
            typeobj.random.id = id;
            typeobj.random.artwork = artwork;
            typeobj.random.type = capitaliseFirstLetter(type[0].type.name);
            // silvally's ability is retrieved as "rks-system"; prettify it
            typeobj.random.ability = prettify(ability[0].ability.name);
            // console.log(typeobj.random.ability);
            // console.log("default break at fill-details function");
            break;
    }
}

// capitalise the first letter of a string
function capitaliseFirstLetter(str) {
    let capitalised = str.charAt(0).toUpperCase() + str.slice(1);
    return capitalised;
}

// format a two-word ability (phrase) with the first letter of each word capitalised
function prettify(ability) {
    // eg. ability = "ice-body": split the phrase into "ice" (partA) and "body" (partB)
    let partA = ability.split("-")[0];
    // special condition for silvally's ability "RKS System": all partA must be capitalised
        if (ability.includes("rks")) {
            partA = partA.toUpperCase(); // ie. Rks = RKS
        }

    let partB = ability.split("-")[1];

    // join the phrase back together and capitalise each word eg. "Ice Body"
    let prettified = `${capitaliseFirstLetter(partA)} ${capitaliseFirstLetter(partB)}`;
    return prettified;
}

function prettifyInput(userinput) {
    /* got help for the for-loop part from here: 
    https://www.tutorialspoint.com/how-to-capitalize-the-first-letter-of-each-word-in-a-string-using-javascript#:~:text=Courses-,How%20to%20capitalize%20the%20first%20letter%20of,in%20a%20string%20using%20JavaScript%3F&text=At%20first%2C%20you%20need%20to,()%20for%20the%20extracted%20character. */

    let separateWord = userinput.toLowerCase().split(" ");

    for (var i = 0; i < separateWord.length; i++) {
        separateWord[i] = separateWord[i].charAt(0).toUpperCase() + separateWord[i].slice(1);
    }
    return separateWord.join(" ");
}


//GENERATE YOUR POKEMON function

function generatePkmn() {

    tempDisplay.innerHTML = "";

    //massive if/else statement to cover various generes and decide which type pokemon they are
    if (!artistGenre) {
        randomisePokemon();

        //BUG TYPE
    } else if (artistGenre.includes("blues")) {
        yourPkmn = typeInfo.bug;
        console.log("the pokemon is " + JSON.stringify(typeInfo.bug));
        appendElements(yourPkmn);

        //DARK TYPE
    } else if (artistGenre.includes("punk")) {
        yourPkmn = typeInfo.dark;
        console.log("the pokemon is " + JSON.stringify(typeInfo.dark));
        appendElements(yourPkmn);

        //DRAGON TYPE
    } else if (artistGenre.includes("classical")) {
        yourPkmn = typeInfo.dragon;
        console.log("the pokemon is " + JSON.stringify(typeInfo.dragon));
        appendElements(yourPkmn);

        //ELECTRIC TYPE
    } else if (artistGenre.includes("dance")) {
        yourPkmn = typeInfo.electric;
        console.log("the pokemon is " + JSON.stringify(typeInfo.electric));
        appendElements(yourPkmn);

        //FAIRY TYPE
    } else if (artistGenre.includes("pop")) {
        yourPkmn = typeInfo.fairy;
        console.log("the pokemon is " + JSON.stringify(typeInfo.fairy));
        appendElements(yourPkmn);

        //FIGHTING TYPE
    } else if (artistGenre.includes("R&B") || artistGenre.includes("rhythm") || artistGenre.includes("hip hop")) {
        yourPkmn = typeInfo.fighting;
        console.log("the pokemon is " + JSON.stringify(typeInfo.fighting));
        appendElements(yourPkmn);

        //FIRE TYPE
    } else if (artistGenre.includes("jazz")) {
        yourPkmn = typeInfo.fire;
        console.log("the pokemon is " + JSON.stringify(typeInfo.fire));
        appendElements(yourPkmn);

        //FLYING TYPE
    } else if (artistGenre.includes("orchestra")) {
        yourPkmn = typeInfo.flying;
        console.log("the pokemon is " + JSON.stringify(typeInfo.flying));
        appendElements(yourPkmn);

        //GHOST TYPE
    } else if (artistGenre.includes("soul") || artistGenre.includes("religious")) {
        yourPkmn = typeInfo.ghost;
        console.log("the pokemon is " + JSON.stringify(typeInfo.ghost));
        appendElements(yourPkmn);

        //GRASS TYPE
    } else if (artistGenre.includes("folk") || artistGenre.includes("celtic")) {
        yourPkmn = typeInfo.grass;
        console.log("the pokemon is " + JSON.stringify(typeInfo.grass));
        appendElements();

        //GROUND TYPE
    } else if (artistGenre.includes("country")) {
        yourPkmn = typeInfo.ground;
        console.log("the pokemon is " + JSON.stringify(typeInfo.ground));
        appendElements(yourPkmn);

        //ICE TYPE
    } else if (artistGenre.includes("chill-out") || artistGenre.includes("lo-fi")) {
        yourPkmn = typeInfo.ice;
        console.log("the pokemon is " + JSON.stringify(typeInfo.ice));
        appendElements(yourPkmn);

        //NORMAL TYPE
    } else if (artistGenre.includes("easy") /*|| artistGenre.includes("adult standards")*/ ) {
        yourPkmn = typeInfo.normal;
        console.log("the pokemon is " + JSON.stringify(typeInfo.normal));
        appendElements(yourPkmn);

        //POISON TYPE
    } else if (artistGenre.includes("punk") || artistGenre.includes("rap")) {
        yourPkmn = typeInfo.poison;
        console.log("the pokemon is " + JSON.stringify(typeInfo.poison));
        appendElements(yourPkmn);

        //PSYCHIC TYPE
    } else if (artistGenre.includes("new age")) {
        yourPkmn = typeInfo.psychic;
        console.log("the pokemon is " + JSON.stringify(typeInfo.psychic));
        appendElements(yourPkmn);

        //ROCK TYPE
    } else if (artistGenre.includes("rock")) {
        yourPkmn = typeInfo.rock;
        console.log("the pokemon is " + JSON.stringify(typeInfo.rock));
        appendElements(yourPkmn);

        //METAL TYPE
    } else if (artistGenre.includes("metal")) {
        yourPkmn = typeInfo.steel;
        console.log("the pokemon is " + JSON.stringify(typeInfo.steel));
        appendElements(yourPkmn);

        //WATER TYPE
    } else if (artistGenre.includes("ambient")) {
        yourPkmn = typeInfo.water;
        console.log("the pokemon is " + JSON.stringify(typeInfo.water));
        appendElements(yourPkmn);

    } else {
        randomisePokemon();
    }


    // SAVE TO LOCAL STORAGE
    saveResults();

};

function randomisePokemon() {

    //retrieve a random key value pair from an object: https://stackoverflow.com/questions/61042479/how-to-get-a-random-key-value-from-a-javascript-object

    types = Object.keys(typeInfo);
    randomise = Math.floor(Math.random() * types.length);
    yourPkmn = typeInfo[types[randomise]];
    console.log("the pokemon is " + JSON.stringify(yourPkmn));

    appendElements(yourPkmn);

}

// place holder append elements so we could see the javascript in action

function appendElements() {

    let yourPkmnDisplay = document.createElement("div");
    yourPkmnDisplay.innerHTML = yourPkmn.name;

    let yourPkmnImage = document.createElement("img");
    yourPkmnImage.setAttribute("src", yourPkmn.artwork);
    yourPkmnDisplay.appendChild(yourPkmnImage);

    let yourPkmnInfo = document.createElement('div');
    yourPkmnInfo.innerHTML = yourPkmn.entry;

    tempDisplay.appendChild(yourPkmnDisplay);
    yourPkmnDisplay.appendChild(yourPkmnInfo);

}

//place holder script so we could ensure the functionality for userInput form was working

// button submit 
function matchArtistToPokemon(event) {
    event.preventDefault();

    //FOR THE LOVE OF EVERYTHING CHANGE THIS STRING TO USERINPUT.VALUE
    artistInput = userInput.value.trim();

    if (!artistInput) {
        alert("WRITE AN ARTIST");
    } else {
        getSpotifyToken();
    }

}


function saveResults() {
    // make result object
    var match = {
        "artist": prettifyInput(artistInput),
        "pokemon": yourPkmn.name,
        "type": yourPkmn.type
    }

    // pull results from local storage
    let allresults = JSON.parse(localStorage.getItem("Results"));
    // if there are no results then make a new empty array
    if (!allresults) {
        allresults = [];
    }

    // add the match to allresults
    allresults.push(match);

    // set to local storage
    localStorage.setItem("Results", JSON.stringify(allresults));

}


// initialise the page
function init() {
    getPokeApi();
}

// start the app
init();


//THIS EVENT LISTENER WILL NEED TO CHANGE TO THE FORM SUBMIT BUTTON WHEN WE CREATE THE USER INPUT FIELD
artistBtn.addEventListener("click", matchArtistToPokemon)


/*
==========
NOTES FOR THIS BRANCH:

-- moved `let yourPkmn = "";` into the global scope (at top of page)
-- commented out 'adult standards' genre for testing random output (use louis armstrong)
-- removed yourPkmn from grass appendElements(__) for testing (use enya) 


-- merged with main so at the top, modal js is in there

*/