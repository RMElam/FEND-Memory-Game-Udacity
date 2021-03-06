//define cards
let cards = ["fa-diamond", "fa-diamond", 
"fa-paper-plane-o", "fa-paper-plane-o", 
"fa-anchor", "fa-anchor", 
"fa-bolt", "fa-bolt", 
"fa-cube", "fa-cube", 
"fa-leaf", "fa-leaf", 
"fa-bicycle", "fa-bicycle", 
"fa-bomb", "fa-bomb"];

const card = document.getElementsByClassName("card");

//open cards array
let openCards = [];

//matched cards
const matchedCards = document.getElementsByClassName('match');


//moves counter
let moves = 0
let counter = document.querySelector('.moves');

//rating stars
let starsList = document.querySelectorAll(".stars li");
const stars = document.querySelectorAll('.fa-star');

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
};

 //creates the cards
 function createCard(card) {
 	return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`
 };

//shuffles cards and begins game
function startGame(){
	let deck = document.querySelector('.deck');
	let cardHTML = shuffle(cards).map(function(card){
		return createCard(card);
	});

	deck.innerHTML = cardHTML.join('');

 	//removes existing classes
 	for(let i=0; i<cards.length; i++){
 		card[i].classList.remove('open', 'show', 'matched', 'unmatched', 'disabled');
 	}

	//restart moves counter
	let moves = 0
	counter.innerHTML = moves;

	 //reset timer
	 let second = 0;
	 let minute = 0; 
	 let hour = 0;
	 let interval;
	 const timer = document.querySelector(".timer");
	 timer.innerHTML = "0 mins 0 secs";
	 clearInterval(interval);
	};
	startGame();
	playGame();

 //turn cards over/push cards into an array/ test if cards match 
 function playGame() {
 	for (let i=0; i<cards.length; i++) {
 		card[i].addEventListener('click', function() {
 			this.classList.add('open', 'show', 'disabled');
 			

 			if (this.classList.contains('open') || this.classList.contains('show') || this.classList.contains('disabled')) {
 				openCards.push(this);
 			}

 			if (openCards.length > 2){
 				this.classList.remove('open', 'show', 'disabled');
 			}

 			if (openCards.length === 2) {
 				moveCounter();
 				test();
 			}
 		});
 	}
 };

  //testing cards function
  function test() {
  	let cardOneType = openCards[0].dataset.card;
  	let cardTwoType = openCards[1].dataset.card;

  	if (cardOneType === cardTwoType) {
  		matched();

  	} else {
  		unmatched();
  	}
  };

//cards when matched
function matched() {
	openCards[0].classList.add('match', 'disabled');
	openCards[1].classList.add('match', 'disabled');
	setTimeout(function(){
		openCards[0].classList.remove('show', 'open');
		openCards[1].classList.remove('show', 'open');
		openCards = [];
	}, 1000);
};

//cards when unmatched
function unmatched() {
	openCards[0].classList.add('unmatched', 'disabled');
	openCards[1].classList.add('unmatched', 'disabled');
	setTimeout(function(){
		openCards[0].classList.remove('show', 'open', 'unmatched', 'disabled');
		openCards[1].classList.remove('show', 'open', 'unmatched', 'disabled');
		openCards = [];
	}, 1000);
};

//moves counter
function moveCounter(){
	moves++;
	counter.innerHTML = moves;
	//start timer
	if (moves == 1){
		startTimer();
	}

	//star ratings
	if(moves > 10 && moves < 20){
		for( i = 0; i < 3; i++) {
			if(i > 1){
				stars[i].style.visibility = "collapse";
			}
		}
	}else if (moves > 21){
		for(i = 0; i < 3; i++){
			if(i > 0){
				stars[i].style.visibility = "collapse";
			}
		}
	}
};

//game timer
const timer = document.querySelector('.timer');
let second = 0;
let minute = 0;
let hour = 0;
let interval;
function startTimer(){
	interval = setInterval(function(){
		timer.innerHTML = minute+'mins '+second+'secs';
		second++;
		if(second === 60){
			minute++;
			second = 0;
		}
		if(minute === 60){
			hour++;
			minute = 0;
		}
	}, 1000);
};

//restart button
function restartButton(){
	let restart = document.querySelector('.restart');
	restart.addEventListener('click', function(e){
		startGame();
		playGame();
		moves = 0;
	});
};
restartButton();

//congrats modal
function congratsModal(){
	let totalCount = counter.innerHTML;
	let starRating = stars.innerHTML;
	let totalTimer = timer.innerHTML;
	if (matchedCards.length == 16) {
		clearInterval(interval);
		swal({
			title: "Congratulations!",
			text: `You did it in ${totalCount} moves!
			Your rating is ${starRating} stars!
			Your total time was ${totalTimer}. 
			Want to play again?`
			
		})
	}
};

//event listener to run congrats modal
for(let i=0; i<cards.length; i++) {
	card[i].addEventListener('click', congratsModal);
};
