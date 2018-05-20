//Array of all the symbols presented in the game
let symbols = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-anchor", "fa-leaf",
  "fa-bicycle", "fa-diamond", "fa-bomb", "fa-leaf", "fa-bomb", "fa-bolt", "fa-bicycle", "fa-paper-plane-o", "fa-cube"
];
let openedCards = [];
let totalMoves = 0;
let matchFound = 0;
let totalStars = 3;
let clicks = 0;
let timerStarter;
let timer = {
  seconds: 0,
  minutes: 0
};

generateCards();

// Get the modal
var modal = document.getElementById('myModal');
let resultText = document.querySelector('.result-text');
var closeModal = document.getElementsByClassName("close")[0]; // Get the <span> element that closes the modal

//Run reset function if user clicks on repeat button
document.querySelector('.fa-repeat').addEventListener('click', reset);

// When the user clicks on (x), We close the modal
closeModal.onclick = function() {
  modal.style.display = "none";
}

//When user clicks on playAgain button, we reload the location and reset it back
document.querySelector('button').addEventListener('click', function() {
  location.reload();
})

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

//Function that starts timer as soon as the number of click reaches 1
function startTimer() {
  timerStarter = setInterval(function() {
    if (clicks == 1) {
      if (timer.seconds == 59) {
        timer.minutes++;
        if (timer.minutes < 10) {
          timer.minutes = "0" + timer.minutes;
        }
        timer.seconds = 0;
      } else {
        timer.seconds++;
      }
      if (timer.seconds < 10) {
        timer.seconds = "0" + timer.seconds;
      }
      //Display time in this location
      document.querySelector('.timer').textContent = timer.minutes + " : " + timer.seconds;
    }
  }, 1000);
}

//Stops the timerStarter function to stop timer from runnning
function stopTimer() {
  clearInterval(timerStarter);
}

//Get all cards and classes of cards containing fa
var cards = document.querySelectorAll('.card');
var iCard = document.querySelectorAll('.card i.fa');
//For loop that iterates through all the cards and finds the one that's clicked and performs the work
for (var i = 0; i < cards.length; i++) {
  cards[i].addEventListener('click', function() {
    clicks = 1;
    this.classList.add('open');
    this.classList.add('show');
    this.style.pointerEvents = 'none';
    openedCards.push(this.children[0]);
    cardMatch();
    totalMoves++;
    document.querySelector('.moves').textContent = Math.floor(totalMoves / 2);
    rating(Math.floor(totalMoves / 2));
  });
}

//Check if the cards match
function cardMatch() {
  if (openedCards.length == 2) {
    if ((openedCards[0].className) == (openedCards[1].className)) {
      matchFound++;
      //loops through the cards of i to find the match
      //If the match if found, changes color, and shows the cards on the screen
      for (var i = 0; i < iCard.length; i++) {
        if (openedCards[0].className == iCard[i].className) {
          iCard[i].parentNode.classList.add('match');
          iCard[i].parentNode.style.pointerEvents = 'none'; //Stop from being clicked
          resultText.textContent = "CORRECT";
          resultText.classList.remove('incorrect');
          resultText.classList.add('correct');
        }
      }
      //If the match is found reset openedCards to 0
      openedCards = [];
      //Run winner function to check if user is the winner yet?
      winner();
      //If the cards do not match add text incorrect and flip them back
    } else if (openedCards[0].className != openedCards[1].className) {
      for (let i = 0; i < iCard.length; i++) {
        resultText.textContent = "INCORRECT";
        resultText.classList.add('incorrect');
        setTimeout(function() {
          iCard[i].parentNode.classList.remove('show');
          iCard[i].parentNode.classList.remove('open');
        }, 300);
        iCard[i].parentNode.style.pointerEvents = 'auto'; //Release the click function
        openedCards = [];
      }
    }
  }
}

//Determines the winner and shows the result in the display
function winner() {
  if (matchFound == 8) {
    stopTimer();
    setTimeout(function() {
      document.querySelector('.modal').style.display = "inline";
      document.querySelector('.displayMoves').textContent = "Total Moves: " + Math.floor(totalMoves / 2);
      document.querySelector('.displayTime').textContent = "Time Taken: " + timer.minutes + " minutes and " + timer.seconds + " seconds";
      document.querySelector('.displayStars').textContent = "Stars Collected: " + totalStars;
    }, 400);
    clearInterval(startTimer); //Stops timer after the winner is found
  }
}

//Generates card and places them randomly
function generateCards() {
  var iCard = document.querySelectorAll('.card i.fa');
  shuffle(symbols);
  for (var i = 0; i < iCard.length; i++) {
    console.log(iCard[i]);
    iCard[i].setAttribute('class', 'fa ' + symbols[i]);
  }
}

startTimer();

//reloads the window i.e resetting back to new game
function reset() {
  location.reload();
}

//calculates the stars according to the number of moves
function rating(moves) {
  if (moves <= 10) {
    //Do nothing!
  } else if (moves > 10 && moves <= 20) {
    document.getElementById('third-star').classList.remove('game-star');
    totalStars = 2;
  } else if (moves > 20 && moves <= 30) {
    document.getElementById('second-star').classList.remove('game-star');
    totalStars = 1;
  } else if (moves > 30) {
    document.getElementById('first-star').classList.remove('game-star');
    totalStars = 0;
  }
}
