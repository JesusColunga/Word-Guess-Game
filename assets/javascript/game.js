/* game.js                            */
/* \Word-Guess-Game\assets\javascript */ 
/* 6/Mar/2019                         */

// VARIABLES
// =======================================================================================
//var varLettersTyped = document.getElementById ("lettersTyped"); 

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
    }

}


// FUNCTIONS
// ========================================================================================
function random_item(items) {
    return items[Math.floor(Math.random()*items.length)];
}


// FUNCTION CALLS (Execution)
// =======================================================================================
/*  ESTO NO FUNCIONÓ:
    var VarTeclaUsuario = document.getElementById ("lettersTyped");
    document.onkeyup = function(event) {
      // Determines which key was pressed.
      var userGuess = event.key;
      VarTeclaUsuario.textContent = "User guess: " + userGuess;
	  }
*/

document.onkeyup = function(event) {
    tecla = event.key.toUpperCase();
    if (game.start) {
        game.reset ();
        game.started ();
        game.selectWord ();
        game.initGuessingWord ();
        game.showGuessingWord ();
    }
	
    console.log (game);
	game.addTypedLetter (tecla);
    game.showTypedLetters ();  
    game.lookForTypedLetter (tecla);
    game.showGuessingWord ();
    game.decreaseRemaining ();
    game.showRemaining ();
    if (game.checkWins ()) {
        game.win ();
        game.showWins ();
        alert ("You WIN ! ! !");
        game.reset ();
        game.selectWord ();
        game.initGuessingWord ();
        game.showGuessingWord ();
        game.showTypedLetters ();
        game.showRemaining ();
    } else {
        if (game.guessesRemaining < 1) {
            alert ("You lose !");
            game.reset ();
            game.selectWord ();
            game.initGuessingWord ();
            game.showGuessingWord ();
            game.showTypedLetters ();
            game.showRemaining ();
        }
    }

    // buscar si la letra tecleada se encuentra en la palabra seleccionada

    // dibujar la posicion donde va la letra tecleada, respetando las anteriores

 }

/* ==============================================================================

        alert ("Selected Word=" + this.selectedWord + 
               " (" + this.selectedWord.length + ") " +
               " / Guessing word=" + this.guessingWord +
               " (" + this.guessingWord.length + 
               ") / New Guessing Word=" + newGuessingWord +
               " (" + newGuessingWord.length + ")"
               );
*/