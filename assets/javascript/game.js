/* game.js                            */
/* \Word-Guess-Game\assets\javascript */ 
/* 6/Mar/2019                         */

// VARIABLES
// =======================================================================================
//var varLettersTyped = document.getElementById ("lettersTyped"); 
var winSoundVar      = new Audio('assets/sounds/Metroid_Door-Brandino480-995195341.mp3');
var loseSoundVar     = new Audio('assets/sounds/foghorn-daniel_simon.mp3');
var repeatedSoundVar = new Audio('assets/sounds/qubodup-cfork-ccby3-jump.ogg');
var lettersArr       = processFillLettersArr ();
var tecla            = "";

var game = {
    arrWords         : ["EARTH", "GALAXY", "CELESTIAL", "MOON", "STAR", "EQUATOR", "SPACE", "PLANET", "COSMOS", "ASTEROID", "AXIAL", "ASTRONOMY", "ASTRONAUT", "COMET", "EQUINOX", "ECLIPSE", "GEOSTATIONARY", "GRAVITATION", "HYPERNOVA", "METEORITE", "NEBULA", "ORBIT", "SATELLITE", "SOLAR", "UNIVERSE", "WAVELENGTH"],
    selectedWord     : "",     // The word the computer selects randomly
	arrTypedLetters  : [],     // Letters already typed by the user
    guessesRemaining : 20,     // Chances the user still has for the rest of the game
    wins             : 0,      // Number of times the usar has won
    lettersGuessed   : [],
    guessingWord     : "",     // Shows number of letters the word to be guessed has and correct letters guessed and their position 
    start            : true,
    
    
    reset: function () {
        this.selectedWord     = "";
        this.arrTypedLetters  = [];
        this.guessesRemaining = 20;
        this.lettersGuessed   = [];
        this.guessingWord     = "";
    },

    started: function () {
        this.start = false;        
    },

    selectWord: function () {
        this.selectedWord = random_item (this.arrWords);
    },

	addTypedLetter: function (letter) {
		this.arrTypedLetters.push (letter);
	},
	
    showTypedLetters: function () {
		document.getElementById("lettersTyped").innerHTML = this.arrTypedLetters;
	},
	
	initGuessingWord: function () {
		this.guessingWord = "_ ".repeat (this.selectedWord.length);
    },
    
    showGuessingWord: function () {
        document.getElementById("guessingWord").innerHTML = this.guessingWord;
    },

    lookForTypedLetter: function (letter) {
        var newGuessingWord = "";
        for (ct=0; ct < this.selectedWord.length; ct++) {
            if (this.selectedWord [ct] == letter) {
                newGuessingWord = newGuessingWord + letter + " ";
            } else {
                newGuessingWord = newGuessingWord + 
                                  this.guessingWord.charAt (ct * 2) +
                                  " ";
            }
        }
        this.guessingWord = newGuessingWord;
    },
    
    checkWins: function () {
        if (this.guessingWord.indexOf ("_") == -1) {
            return true;
        } else {
            return false;
        }
    },
    win: function () {
        this.wins++;
    },

    showWins: function () {
        document.getElementById("wins").innerHTML = this.wins;
    },

    showRemaining:  function () {
        document.getElementById("remaining").innerHTML = this.guessesRemaining;
    },

    decreaseRemaining: function () {
        this.guessesRemaining--;
    },

    winSoundPlay: function () {
        winSoundVar.play ();
    },

    loseSoundPlay: function () {
        loseSoundVar.play ();
    },

    repeatedSoundPlay: function () {
        repeatedSoundVar.play ();
    },

    checkNotRepeatedLetter: function (tecla) {
        if (this.arrTypedLetters.indexOf (tecla) == -1) {
            return true;
        } else {
            this.repeatedSoundPlay ();
            return false;
        }
    }
    
}


// FUNCTIONS
// ========================================================================================
function processFillLettersArr () {
    var arr = [];
    for (ct=65; ct < 91; ct++) {
        arr.push (String.fromCharCode(ct));
    }
    return arr;
}

function random_item(items) {
    return items[Math.floor(Math.random()*items.length)];
}

function processStart () {
    game.reset ();
    game.started ();
    game.selectWord ();
    game.initGuessingWord ();
    game.showGuessingWord ();
}

function processWin () {
    game.winSoundPlay ();
    game.win ();
    game.showWins ();
    alert ("You WIN ! ! !");
    game.reset ();
    game.selectWord ();
    game.initGuessingWord ();
    game.showGuessingWord ();
    game.showTypedLetters ();
    game.showRemaining ();
}

function processLose () {
    game.loseSoundPlay ();
    alert ("You lose !");
    game.reset ();
    game.selectWord ();
    game.initGuessingWord ();
    game.showGuessingWord ();
    game.showTypedLetters ();
    game.showRemaining ();
}

function processKey (tecla) {
	game.addTypedLetter (tecla);
    game.showTypedLetters ();  
    game.lookForTypedLetter (tecla);
    game.showGuessingWord ();
    game.decreaseRemaining ();
    game.showRemaining ();
    if (game.checkWins ()) {
        processWin ();
    } else {
        if (game.guessesRemaining < 1) {
            processLose ();
        }
    }
}

// FUNCTION CALLS (Execution)
// =======================================================================================

document.onkeyup = function(event) {

    tecla = event.key.toUpperCase();             // Words in array are uppercase

    if (lettersArr.indexOf(tecla) >= 0) {        // Check the typed key is a letter
        
        if (game.start) {
            processStart ()                      // Just the first time to start the game
        }

        console.log (game);

        if (game.checkNotRepeatedLetter (tecla)) {
            processKey (tecla);                  // Procedure to process the typed letter
        }
    }
 }
