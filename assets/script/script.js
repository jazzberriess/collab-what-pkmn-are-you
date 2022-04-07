// =============================
//        GLOBAL VARIABLES
// =============================

// -----------------------------
//          DOM variables
// -----------------------------

// results and history displays
let resultsDisplay = document.getElementById("results-display");
let historyDisplay = document.getElementById("history-display");

// each 'screen'/stage of the app
let splashScreen = document.getElementById("pokeball-splash-screen");
let resultsScreen = document.getElementById("results-display-screen");
let historyScreen = document.getElementById("history-display-screen");

// history button container
let historyButtonContainer = document.getElementById("history-button-container");

// button to submit user name and chosen artist (aka start the app)
let artistBtn = document.getElementById("start-button");
// other buttons 
let playAgainButton = document.getElementById("play-again-button");
let goBackButton = document.getElementById("go-back-button");
let clearHistoryBtn = document.getElementById("clear-history-button");
let showHistoryBtn = document.getElementById("show-history-button");

// -----------------------------
//      USER INPUT variables
// -----------------------------

let userInput = document.getElementById("user-input");
let userNameInput = document.getElementById("user-name");

// -----------------------------
//         MODAL variables
// -----------------------------

// modal parts
var modalUnderlay = document.getElementById("modal-underlay");
var modal = document.getElementById("modal");
var modalContent = document.getElementById("modal-content");

// modal error messages
var modalNoInput = document.getElementById("modal-no-input");
var modalNoArtist = document.getElementById("modal-no-artist");

// buttons belonging to modal
var modalButton = document.getElementById("modal-button");
var tryAgainButton = document.getElementById("try-again-button");
var tryAgainButtonArtist = document.getElementById("try-again-button-artist");

// span that closes the modal
var closeModalButton = document.getElementById("close");

// -----------------------------
//      POKÉMON API variables
// -----------------------------

// full type list: OBJ = { key: name, id, artwork, entry, type, ability, bgcolour }
var typeInfo = {
    "bug": 
        { "name": {}, "id": {}, "artwork": {}, "entry": {}, "type": {}, "ability": {}, "bgcolour": {} },
    "dark": 
        { "name": {}, "id": {}, "artwork": {}, "entry": {}, "type": {}, "ability": {}, "bgcolour": {} },
    "dragon": 
        { "name": {}, "id": {}, "artwork": {}, "entry": {}, "type": {}, "ability": {}, "bgcolour": {} },
    "electric": 
        { "name": {}, "id": {}, "artwork": {}, "entry": {}, "type": {}, "ability": {}, "bgcolour": {} },
    "fairy": 
        { "name": {}, "id": {}, "artwork": {}, "entry": {}, "type": {}, "ability": {}, "bgcolour": {} },
    "fighting": 
        { "name": {}, "id": {}, "artwork": {}, "entry": {}, "type": {}, "ability": {}, "bgcolour": {} },
    "fire": 
        { "name": {}, "id": {}, "artwork": {}, "entry": {}, "type": {}, "ability": {}, "bgcolour": {} },
    "flying": 
        { "name": {}, "id": {}, "artwork": {}, "entry": {}, "type": {}, "ability": {}, "bgcolour": {} },
    "ghost": 
        { "name": {}, "id": {}, "artwork": {}, "entry": {}, "type": {}, "ability": {}, "bgcolour": {} },
    "grass": 
        { "name": {}, "id": {}, "artwork": {}, "entry": {}, "type": {}, "ability": {}, "bgcolour": {} },
    "ground": 
        { "name": {}, "id": {}, "artwork": {}, "entry": {}, "type": {}, "ability": {}, "bgcolour": {} },
    "ice": 
        { "name": {}, "id": {}, "artwork": {}, "entry": {}, "type": {}, "ability": {}, "bgcolour": {} },
    "normal": 
        { "name": {}, "id": {}, "artwork": {}, "entry": {}, "type": {}, "ability": {}, "bgcolour": {} },
    "poison": 
        { "name": {}, "id": {}, "artwork": {}, "entry": {}, "type": {}, "ability": {}, "bgcolour": {} },
    "psychic": 
        { "name": {}, "id": {}, "artwork": {}, "entry": {}, "type": {}, "ability": {}, "bgcolour": {} },
    "rock": 
        { "name": {}, "id": {}, "artwork": {}, "entry": {}, "type": {}, "ability": {}, "bgcolour": {} },
    "steel": 
        { "name": {}, "id": {}, "artwork": {}, "entry": {}, "type": {}, "ability": {}, "bgcolour": {} },
    "water": 
        { "name": {}, "id": {}, "artwork": {}, "entry": {}, "type": {}, "ability": {}, "bgcolour": {} }
}

// -----------------------------
//      SPOTIFY variables
// -----------------------------

//setting global variables for the SpotifyAPI so we can access the retrieved json data in other functions
let savedArtistData = [];
let artistGenre = "";
let artistInput = "";
//variable to store the generated pokemon data in so we can then create the elements to display the information
let yourPkmn = "";

// -----------------------------
//       SCREENS variable 
// -----------------------------

// (to make step-through of each stage easier)
var screens = {
    "splashscreen": splashScreen,
    "resultsscreen": resultsScreen,
    "historyscreen": historyScreen
}

// =============================
//          FUNCTIONS
// =============================

// -----------------------------
//      SCREEN DISPLAY function
// -----------------------------

// to make step-through of each stage easier
function showScreens(name) {
    for (key in screens) {
        var currentscreen = screens[key];
        if (key === name) {
            // if the current screen matches the passed-through name, show the current screen
            currentscreen.classList.remove("hidden");
            // further conditions:
            if (name === "resultsscreen") {
                // on the results screen, add play-again, hide go-back and clear
                playAgainButton.classList.remove("hidden");
                goBackButton.classList.add("hidden");
                clearHistoryBtn.classList.add("hidden");
            } else if (name === "historyscreen") {
                // on the history screen, add go-back, hide play-again and clear
                playAgainButton.classList.add("hidden");
                goBackButton.classList.remove("hidden");
                clearHistoryBtn.classList.remove("hidden");
            }
        } else {
            // hide all other screens
            currentscreen.classList.add("hidden");
        }
    }
}

// -----------------------------
//      FORM SUBMIT function 
// (user name & choice of artist)
// -----------------------------

// the button that starts the generating process
function matchArtistToPokemon(event) {
    event.preventDefault();
    // make the user input a variable for later use
    artistInput = userInput.value.trim();
    userName = userNameInput.value.trim();

    // if user doesn't input anything, 
    if (!artistInput || !userName) {
        missingInput();
    } else {
        getSpotifyToken();
    }
}

// -----------------------------
//      MODAL functions
// -----------------------------

// open the modal
function openModal() {
    // every time this functin is called, reset the user input first
    resetUserInputs();
    // show the modal contents (form) and hide the "missing input" error message
    modalContent.classList.remove("hidden");
    modalNoInput.classList.add("hidden");
    modalNoArtist.classList.add("hidden");

    // set the modal underlay to show
    modalUnderlay.style.display = "block";
    // if anywhere on the modal underlay (black bit) is clicked, close and reset modal
    window.addEventListener("click", function (event) {
        if (event.target === modalUnderlay) {
            closeModal();
        }
    });
    // if the modal's close button ('x') is pressed, close and reset the modal
    closeModalButton.addEventListener("click", function (event) {
        if (event.target === closeModalButton) {
            closeModal();
        }
    });
}

// close and reset the modal by resetting user input
function closeModal() {
    modalUnderlay.style.display = "none";
}

// reset the user input value
function resetUserInputs() {
    userInput.value = "";
    userNameInput.value = "";
}

// if no user input, then hide the form and show the error message
function missingInput() {
    modalContent.classList.add("hidden");
    modalNoInput.classList.remove("hidden");
    modalNoArtist.classList.add("hidden");
    // try again button will open modal back up
    tryAgainButton.addEventListener("click", openModal);
}

// if an artist can't be found on spotify, hide the form and show the error message
function noArtistModal() {
    modalContent.classList.add("hidden");
    modalNoInput.classList.add("hidden");
    modalNoArtist.classList.remove("hidden");
    // try again button will open modal back up
    tryAgainButtonArtist.addEventListener("click", openModal);
}

// -----------------------------
//      SPOTIFY API functions
// -----------------------------

// obtain authorisation token
function getSpotifyToken() {
    // client ID's required to create token to access the Spotify API
    let clientId = "01c9a8e4c05447c697c5bc044cb8d512";
    let clientSecret = "cef744acfdb142c68f81d49f01f6a6b7";

    // URL for the spotify API token
    let apiTokenReq = "https://accounts.spotify.com/api/token";

    // fetch request to create the authorisation token for spotify API
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
            // if there is an error, throw the response
            if (!response.ok) {
                throw response.json();
            // else return the response as a json file
            } else {
                return response.json();
            }
        })
        // then take the token from the response data
        .then(function (token) {
            let accessToken = token.access_token;
            //and run the getArtistData function, pass the accessToken to next function
            getArtistData(accessToken);
        })
        // catch any errors and console log them
        .catch(function (error) {
            console.log(error);
        });
}

// obtain artist details based on user input
function getArtistData(accessToken) {
    // URL for the artist search via the spotify API - limit the search query to five results
    let spotifyArtistSearch = "https://api.spotify.com/v1/search?type=artist&q=" + artistInput + "&limit=5";

    // fetch request for artist Data
    fetch(spotifyArtistSearch, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken,
        }
    })
        //retrieve the API response
        .then(function (response) {
            // if there is an error, throw the response
            if (!response.ok) {
                throw response.json();
            // else return the response as a json file
            } else {
                return response.json();
            }
        })
        // then take the artistData from the response data
        .then(function (artistData) {
            // if there's no artist data, display please try again message to user
            if (artistData.artists.items.length === 0) {
                openModal();
                noArtistModal();
            } else {
                //save the returned artistData to an empty global object to use in future functions
                savedArtistData = artistData;
                //save the artistGenre details to an empty global object to use in future functions
                artistGenre = savedArtistData.artists.items[0].genres[0];
                // generate the pokemon based off the artist data
                generatePkmn();
            }
        })
        //catch any errors and console log them
        .catch(function (error) {
            console.log(error);

        });
    // after all music data has been retrieved, then close and reset the modal. If the modal is reset before this point, Spotify API won't work because the user input gets cleared -- everything needs the user input
    closeModal();
}

// -----------------------------
//       pokéAPI functions
// -----------------------------

// connect to pokéAPI
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
    fetch(url)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            } else {
                return response.json();
            }
        })
        .then(function (data) {
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
        })
        .catch(function (error) {
            console.log(error);
        });
}

// get the species url 
function getPokemonSpecies(typeobj, species) {
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
        default:
            break;
    }
}

// this will fill 'typeInfo' object with three keys: poké name, poké ID no., poké artwork url
function fillPokemonDetails(typeobj, name, id, artwork, type, ability) {
    let pokemon = name;

    // using the pokemon name as a determiner
    switch (pokemon) {
        // for the case of 'kricketune'
        case "kricketune":
            // add to typeInfo object under 'bug' key: name, id, artwork url values of kricketune
            typeobj.bug.name = prettifyName(name);
            typeobj.bug.id = id;
            typeobj.bug.artwork = artwork;
            typeobj.bug.type = prettifyName(type[0].type.name);
            typeobj.bug.ability = prettifyName(ability[1].ability.name);
            // also add a background colour for use in results card later
            typeobj.bug.bgcolour = "#C3EB98";
            break;
        // for the case of 'zoroark'
        case "zoroark":
            // add to typeInfo object under 'dark' key: name, id, artwork url values of zoroark
            typeobj.dark.name = prettifyName(name);
            typeobj.dark.id = id;
            typeobj.dark.artwork = artwork;
            typeobj.dark.type = prettifyName(type[0].type.name);
            typeobj.dark.ability = prettifyName(ability[0].ability.name);
            // also add a background colour for use in results card later
            typeobj.dark.bgcolour = "#726C82";
            break;
        // and so on
        case "latios":
            typeobj.dragon.name = prettifyName(name);
            typeobj.dragon.id = id;
            typeobj.dragon.artwork = artwork;
            typeobj.dragon.type = prettifyName(type[0].type.name);
            typeobj.dragon.ability = prettifyName(ability[0].ability.name);
            typeobj.dragon.bgcolour = "#C0BFD1";
            break;
        case "mareep":
            typeobj.electric.name = prettifyName(name);
            typeobj.electric.id = id;
            typeobj.electric.artwork = artwork;
            typeobj.electric.type = prettifyName(type[0].type.name);
            typeobj.electric.ability = prettifyName(ability[0].ability.name);
            typeobj.electric.bgcolour = "#F8EC30";
            break;
        case "sylveon":
            typeobj.fairy.name = prettifyName(name);
            typeobj.fairy.id = id;
            typeobj.fairy.artwork = artwork;
            typeobj.fairy.type = prettifyName(type[0].type.name);
            // sylveon's ability is retrieved as "cute-charm"; prettify it
            typeobj.fairy.ability = prettify(ability[0].ability.name);
            typeobj.fairy.bgcolour = "#FDE7F5";
            break;
        // for urshifu's name, need to do some clipping
        case "urshifu-single-strike":
            // first split the name 'urshifu-single-strike' at the "-"
            let urshifu = name.split("-")[0];
            // add to 'fighting' key only the first part of the name (aka 'urshifu')
            typeobj.fighting.name = prettifyName(urshifu);
            typeobj.fighting.id = id;
            typeobj.fighting.artwork = artwork;
            typeobj.fighting.type = prettifyName(type[0].type.name);
            // urshifu's ability is retrieved as "unseen-fist"; prettify it
            typeobj.fighting.ability = prettify(ability[0].ability.name);
            typeobj.fighting.bgcolour = "#FED198";
            break;
        case "torracat":
            typeobj.fire.name = prettifyName(name);
            typeobj.fire.id = id;
            typeobj.fire.artwork = artwork;
            typeobj.fire.type = prettifyName(type[0].type.name);
            typeobj.fire.ability = prettifyName(ability[0].ability.name);
            typeobj.fire.bgcolour = "#FFC4B3";
            break;
        case "pidgeotto":
            typeobj.flying.name = prettifyName(name);
            typeobj.flying.id = id;
            typeobj.flying.artwork = artwork;
            typeobj.flying.type = prettifyName(type[1].type.name);
            // pidgeotto's ability is retrieved as "keen-eye"; prettify it
            typeobj.flying.ability = prettify(ability[0].ability.name);
            typeobj.flying.bgcolour = "#9CDAFE";
            break;
        case "banette":
            typeobj.ghost.name = prettifyName(name);
            typeobj.ghost.id = id;
            typeobj.ghost.artwork = artwork;
            typeobj.ghost.type = prettifyName(type[0].type.name);
            typeobj.ghost.ability = prettifyName(ability[0].ability.name);
            typeobj.ghost.bgcolour = "#D4BDF8";
            break;
        case "lilligant":
            typeobj.grass.name = prettifyName(name);
            typeobj.grass.id = id;
            typeobj.grass.artwork = artwork;
            typeobj.grass.type = prettifyName(type[0].type.name);
            // lilligant's ability is retrieved as "own-tempo"; prettify it
            typeobj.grass.ability = prettify(ability[1].ability.name);
            typeobj.grass.bgcolour = "#93D784";
            break;
        case "piloswine":
            typeobj.ground.name = prettifyName(name);
            typeobj.ground.id = id;
            typeobj.ground.artwork = artwork;
            typeobj.ground.type = prettifyName(type[1].type.name);
            typeobj.ground.ability = prettifyName(ability[0].ability.name);
            typeobj.ground.bgcolour = "#F1CD97";
            break;
        case "bergmite":
            typeobj.ice.name = prettifyName(name);
            typeobj.ice.id = id;
            typeobj.ice.artwork = artwork;
            typeobj.ice.type = prettifyName(type[0].type.name);
            // bergmite's ability is retrieved as "ice-body"; prettify it
            typeobj.ice.ability = prettify(ability[1].ability.name);
            typeobj.ice.bgcolour = "#BFFFFF";
            break;
        case "lickitung":
            typeobj.normal.name = prettifyName(name);
            typeobj.normal.id = id;
            typeobj.normal.artwork = artwork;
            typeobj.normal.type = prettifyName(type[0].type.name);
            // lickitung's ability is retrieved as "cloud-nine"; prettify it
            typeobj.normal.ability = prettify(ability[2].ability.name);
            typeobj.normal.bgcolour = "#e6e6e6";
            break;
        case "skuntank":
            typeobj.poison.name = prettifyName(name);
            typeobj.poison.id = id;
            typeobj.poison.artwork = artwork;
            typeobj.poison.type = prettifyName(type[0].type.name);
            typeobj.poison.ability = prettifyName(ability[1].ability.name);
            typeobj.poison.bgcolour = "#D2BDDF";
            break;
        case "hatterene":
            typeobj.psychic.name = prettifyName(name);
            typeobj.psychic.id = id;
            typeobj.psychic.artwork = artwork;
            typeobj.psychic.type = prettifyName(type[0].type.name);
            // hatterene's ability is retrieved as "magic-bounce"; prettify it
            typeobj.psychic.ability = prettify(ability[2].ability.name);
            typeobj.psychic.bgcolour = "#ECBAF8";
            break;
        case "gigalith":
            typeobj.rock.name = prettifyName(name);
            typeobj.rock.id = id;
            typeobj.rock.artwork = artwork;
            typeobj.rock.type = prettifyName(type[0].type.name);
            typeobj.rock.ability = prettifyName(ability[0].ability.name);
            typeobj.rock.bgcolour = "#D1C2A5";
            break;
        case "aggron":
            typeobj.steel.name = prettifyName(name);
            typeobj.steel.id = id;
            typeobj.steel.artwork = artwork;
            typeobj.steel.type = prettifyName(type[0].type.name);
            // aggron's ability is retrieved as "rock-head"; prettify it
            typeobj.steel.ability = prettify(ability[1].ability.name);
            typeobj.steel.bgcolour = "#C9D8D8";
            break;
        case "primarina":
            typeobj.water.name = prettifyName(name);
            typeobj.water.id = id;
            typeobj.water.artwork = artwork;
            typeobj.water.type = prettifyName(type[0].type.name);
            // primarina's ability is retrieved as "liquid-voice"; prettify it
            typeobj.water.ability = prettify(ability[1].ability.name);
            typeobj.water.bgcolour = "#9AC3FF";
            break;
        default:
            break;
    }
}

// -----------------------------
//  UTILITY functions (POKéMON)
// -----------------------------

// make a passed-thru name return with proper capitalisation
function prettifyName(name) {
    /* got help for the for loop part from here: 
    https://www.tutorialspoint.com/how-to-capitalize-the-first-letter-of-each-word-in-a-string-using-javascript#:~:text=Courses-,How%20to%20capitalize%20the%20first%20letter%20of,in%20a%20string%20using%20JavaScript%3F&text=At%20first%2C%20you%20need%20to,()%20for%20the%20extracted%20character. */

    // make an array by splitting string by spaces
    let separateWord = name.toLowerCase().split(" ");

    // iterate over each word in the array length: capitalise the first letter of each word
    for (var i = 0; i < separateWord.length; i++) {
        separateWord[i] = separateWord[i].charAt(0).toUpperCase() + separateWord[i].slice(1);
    } 
    // return the properly capitalised name
    return separateWord.join(" ");
}

// format a two-word ability (phrase) with the first letter of each word capitalised
function prettify(ability) {
    // eg. ability = "ice-body": split the phrase into "ice" (partA) and "body" (partB)
    let partA = ability.split("-")[0];
    let partB = ability.split("-")[1];

    // join the phrase back together and capitalise each word eg. "Ice Body"
    let prettified = `${prettifyName(partA)} ${prettifyName(partB)}`;
    return prettified;
}

// -----------------------------
//      APPLICATION functions
// -----------------------------

// generate the pokémon based off the artist genre
function generatePkmn() {
    // if there is no genre that matches the ones listed, then match person with a random pokemon
    if (!artistGenre) {
        randomisePokemon();
        appendElements();
        displayResults();
        //BUG TYPE
    } else if (artistGenre.includes("blues") || artistGenre.includes("reggae")) {
        yourPkmn = typeInfo.bug;
        appendElements();
        displayResults();
        //DARK TYPE
    } else if (artistGenre.includes("dubstep") || artistGenre.includes("emo")) {
        yourPkmn = typeInfo.dark;
        appendElements();
        displayResults();
        //DRAGON TYPE
    } else if (artistGenre.includes("classical") || artistGenre.includes("opera") || artistGenre.includes("synth")) {
        yourPkmn = typeInfo.dragon;
        appendElements();
        displayResults();
        //ELECTRIC TYPE
    } else if (artistGenre.includes("dance") || artistGenre.includes("electronic") || artistGenre.includes("edm")) {
        yourPkmn = typeInfo.electric;
        appendElements();
        displayResults();
        //FAIRY TYPE
    } else if (artistGenre.includes("pop")) {
        yourPkmn = typeInfo.fairy;
        appendElements();
        displayResults();
        //FIGHTING TYPE
    } else if (artistGenre.includes("R&B") || artistGenre.includes("rhythm") || artistGenre.includes("hip hop")) {
        yourPkmn = typeInfo.fighting;
        appendElements();
        displayResults();
        //FIRE TYPE
    } else if (artistGenre.includes("jazz") || artistGenre.includes("musical theatre") || artistGenre.includes("latin")) {
        yourPkmn = typeInfo.fire;
        appendElements();
        displayResults();
        //FLYING TYPE
    } else if (artistGenre.includes("orchestra") || artistGenre.includes("soundtrack") || artistGenre.includes("world")) {
        yourPkmn = typeInfo.flying;
        appendElements();
        displayResults();
        //GHOST TYPE
    } else if (artistGenre.includes("soul") || artistGenre.includes("religious") || artistGenre.includes("worship")) {
        yourPkmn = typeInfo.ghost;
        appendElements();
        displayResults();
        //GRASS TYPE
    } else if (artistGenre.includes("folk") || artistGenre.includes("celtic") || artistGenre.includes("psychedelic")) {
        yourPkmn = typeInfo.grass;
        appendElements();
        displayResults();
        //GROUND TYPE
    } else if (artistGenre.includes("country") || artistGenre.includes("indie")) {
        yourPkmn = typeInfo.ground;
        appendElements();
        displayResults();
        //ICE TYPE
    } else if (artistGenre.includes("chill-out") || artistGenre.includes("lo-fi") || artistGenre.includes("alternative")) {
        yourPkmn = typeInfo.ice;
        appendElements();
        displayResults();
        //NORMAL TYPE
    } else if (artistGenre.includes("easy") || artistGenre.includes("adult standards")) {
        yourPkmn = typeInfo.normal;
        appendElements();
        displayResults();
        //POISON TYPE
    } else if (artistGenre.includes("punk") || artistGenre.includes("rap")) {
        yourPkmn = typeInfo.poison;
        appendElements();
        displayResults();
        //PSYCHIC TYPE
    } else if (artistGenre.includes("new age") || artistGenre.includes("techno") || artistGenre.includes("experimental")) {
        yourPkmn = typeInfo.psychic;
        appendElements();
        displayResults();
        //ROCK TYPE
    } else if (artistGenre.includes("rock")) {
        yourPkmn = typeInfo.rock;
        appendElements();
        displayResults();
        //METAL TYPE
    } else if (artistGenre.includes("metal") || artistGenre.includes("hardcore")) {
        yourPkmn = typeInfo.steel;
        appendElements();
        displayResults();
        //WATER TYPE
    } else if (artistGenre.includes("ambient") || artistGenre.includes("instrumental")) {
        yourPkmn = typeInfo.water;
        appendElements();
        displayResults();
    } else {
        randomisePokemon();
        appendElements();
        displayResults();
    }
    // SAVE TO LOCAL STORAGE
    saveResults();
};

// separate function for randomising pokémon
function randomisePokemon() {
    // retrieve a random key value pair from an object: https://stackoverflow.com/questions/61042479/how-to-get-a-random-key-value-from-a-javascript-object
    types = Object.keys(typeInfo);
    randomise = Math.floor(Math.random() * types.length);
    yourPkmn = typeInfo[types[randomise]];
}

// appending the selected Pokémon values to the DOM
function appendElements() {
    // display Pokémon name
    // NB: since there are two instances of pokemon name appearing, grab by class name instead
    let pokemonName = document.getElementsByClassName("pokemon-name");
    // pokemonName will be an array now. Use a for loop to loop through each DOM instance of pokemonName and append the text to each case
    if (pokemonName.length > 0) {
        pokemonName[0].textContent = yourPkmn.name + "!";
        for (var i = 1; i < pokemonName.length; i++) {
            pokemonName[i].textContent = yourPkmn.name;
        }
    }
    //display Pokémon image
    let yourPkmnImage = document.getElementById("pokemon-image");
    yourPkmnImage.setAttribute("src", yourPkmn.artwork);
    yourPkmnImage.setAttribute("alt", "Official artwork of the Pokémon, " + yourPkmn.name + ".");

    //display Pokémon type + info
    let yourPkmnType = document.getElementById("pokemon-type");
    yourPkmnType.textContent = yourPkmn.type;

    //display Pokémon ability
    let yourPkmnAbility = document.getElementById("pokemon-ability");
    yourPkmnAbility.textContent = yourPkmn.ability + "!";

    //display Pokémon info
    let yourPkmnInfo = document.getElementById("pokemon-info");
    yourPkmnInfo.textContent = yourPkmn.entry;

    // change the background colour of the results card depending on the generated pokemon
    resultsDisplay.style.backgroundColor = yourPkmn.bgcolour;
}

// -----------------------------
//   RESULTS DISPLAY functions
// -----------------------------

// this function is called in generatePkmn() to display the results card
function displayResults() {
    showScreens("resultsscreen");
    showHistoryButtons();
}

// -----------------------------
//   HISTORY DISPLAY functions
// -----------------------------

// show the history of past artist-pokemon matches
function displayHistory() {
    showScreens("historyscreen");
    // clear the area first though
    historyDisplay.innerHTML = "";
    // create the heading and append to document
    var historyTitle = document.createElement("h2");
    historyTitle.textContent = "Pokémon People"
    historyDisplay.appendChild(historyTitle);
    // get the results
    retrieveResults();
    showHistoryButtons();
}

// show the history button container
function showHistoryButtons() {
    // unhide the container with all the buttons
    historyButtonContainer.classList.remove("hidden");

    // assign event listeners to play-again, go-back, show/clear history buttons when they appear
    showHistoryBtn.addEventListener("click", displayHistory);
    clearHistoryBtn.addEventListener("click", clearHistory);
    goBackButton.addEventListener("click", goBack);
}

// -----------------------------
//     LOCAL STORAGE functions
// -----------------------------

// save to local storage
function saveResults() {
    // make result object
    var match = {
        "user": prettifyName(userName),
        "artist": prettifyName(artistInput),
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

// retrieve from local storage
function retrieveResults() {
    let localData = JSON.parse(localStorage.getItem("Results"));

    // make an ordered list to hold the results
    let resultsList = document.createElement("ul");
    resultsList.setAttribute("id", "results-list");
    historyDisplay.appendChild(resultsList);

    // if there is no data in local storage
    if (!localData) {
        //create element to display "Nothing here!" msg
        let empty = document.createElement("li");
        empty.textContent = "Oops, no Pokémon here.";
        resultsList.appendChild(empty);
        // if there's no data then remove the "clear history" button
        clearHistoryBtn.classList.add("hidden");

    } else {
        // run through each item in local storage
        for (let i = 0; i < localData.length; i++) {
            // make a list item and add text referencing artist name, pokemon type, and pokemon name
            let line = document.createElement("li");
            line.textContent = `${localData[i].user} loves ${localData[i].artist}, which means they're the ${localData[i].type} type Pokémon, ${localData[i].pokemon}!`;
            // append the list item to the list
            resultsList.appendChild(line)
        }
    }
}

// clear local storage
function clearHistory() {
    //clear local storage
    localStorage.clear();

    //clear history display div
    historyDisplay.innerHTML = "";
    historyDisplay.classList.add("history-display");

    //show message confirming history delete
    let clearMsg = document.createElement("p");
    clearMsg.textContent = "History cleared!";
    historyDisplay.appendChild(clearMsg);

    //hide clear history bytton
    clearHistoryBtn.classList.add("hidden");
}

// -----------------------------
//   UTLITY functions (GENERAL)
// -----------------------------

// return to results page
function goBack() {
    displayResults();
}

// go back to the pokeball splash screen
function backToStart() {
    showScreens("splashscreen");
    historyButtonContainer.classList.add("hidden");
}

// initialise the page
function init() {
    getPokeApi();
    showScreens("splashscreen");
}

// =============================
//         APPLICATION
// =============================

// -----------------------------
//        EVENT LISTENERS
// -----------------------------

// button submit to activate modal
modalButton.addEventListener("click", openModal);
// button submit to get the artist genre and eventually generate the pokemon result
artistBtn.addEventListener("click", matchArtistToPokemon);
// button to replay the app
playAgainButton.addEventListener("click", backToStart);

// -----------------------------
//          APP START
// -----------------------------

// go!
init();