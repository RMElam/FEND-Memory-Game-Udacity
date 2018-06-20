//define cards
let cards = ["fa-diamond", "fa-diamond", 
"fa-paper-plane-o", "fa-paper-plane-o", 
"fa-anchor", "fa-anchor", 
"fa-bolt", "fa-bolt", 
"fa-cube", "fa-cube", 
"fa-leaf", "fa-leaf", 
"fa-bicycle", "fa-bicycle", 
"fa-bomb", "fa-bomb"];

let card = document.getElementsByClassName("card");

//open cards array
let openCards = [];

//matched cards/ matched cards array
let matchedCards = document.getElementsByClassName('match');
let matches = [];

//moves counter
let moves = 0
let counter = document.querySelector('.moves');
let totalMoves = document.getElementById('totalMoves');

//congrats modal
let modal = document.getElementById('modal');

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

 //start game (shuffle cards, reset counter, reset rating, turn cards back over)
 function createCard(card) {
 	return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`
 };

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
};

startGame();
playGame();

 //turn cards over/push cards into an array/ test if cards match 
 function playGame() {
 	for (let i=0; i<cards.length; i++) {
 		card[i].addEventListener('click', function() {
 			this.classList.add('open', 'show');

 			if(this.classList.contains('open') || this.classList.contains('show')) {
 				openCards.push(this);
 			}

 			if (openCards.length === 2) {
 				moveCounter();
 				test();
 			}
 		});
 	}
 };

 function test() {
 	let cardOneType = openCards[0].dataset.card;
 	let cardTwoType = openCards[1].dataset.card;

 	if (cardOneType === cardTwoType) {
 		matched();
 		
 	} else {
 		unmatched();
 	}
 };

 function matched() {
 	openCards[0].classList.add('match', 'disabled');
 	openCards[1].classList.add('match', 'disabled');
 	setTimeout(function(){
 		openCards[0].classList.remove('show', 'open');
 		openCards[1].classList.remove('show', 'open');
 		openCards = [];
 	}, 1000);
 };

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
function congratsModal() {
	if (matches.length == 16) {
		totalMoves = moves.innerHTML;
		console.log(matchedCards);
		//show modal
		modal.style.display = "flex";
	}
};
