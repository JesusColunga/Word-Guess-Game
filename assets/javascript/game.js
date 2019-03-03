/* game.js                            */
/* \Word-Guess-Game\assets\javascript */ 
/* 2/Mar/2019                         */

// VARIABLES
// =======================================================================================
var game = {
    arrWords         : ["EARTH", "GALAXY", "CELESTIAL", "MOON", "STAR", "EQUATOR", "SPACE", "PLANET", "COSMOS", "ASTEROID", "AXIAL", "ASTRONOMY", "ASTRONAUT", "COMET", "EQUINOX", "ECLIPSE", "GEOSTATIONARY", "GRAVITATION", "HYPERNOVA", "METEORITE", "NEBULA", "ORBIT", "SATELLITE", "SOLAR", "UNIVERSE", "WAVELENGTH"],
    selectedWord     : "",
    guessesRemaining : 20,
    wins             : 0,
    lettersGuessed   : [],
    guessingWord     : [],
    start            : true,

    reset: function () {
        this.guessesRemaining = 20;
        this.wins             = 0;
        this.lettersGuessed   = [];
        this.guessingWord     = [];
    },

    started: function () {
        this.start = false;        
    },

    selectWord: function () {
        this.selectedWord = random_item (this.arrWords);
    }

}



// FUNCTIONS
// ========================================================================================
function random_item(items) {
    return items[Math.floor(Math.random()*items.length)];
}

// FUNCTION CALLS (Execution)
// =======================================================================================
document.onkeyup = function(event) {
    tecla = event.key;
    if (game.start) {
        game.reset ();
        game.started ();
        game.selectWord ();
    }
    console.log (game);
}
