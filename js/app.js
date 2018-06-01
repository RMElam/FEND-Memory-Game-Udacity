
//Create a list that holds all of your cards
let card = document.getElementsByClassName('card');
let cards = [...card];
console.log(cards);

// deck of all cards in game
const deck = document.getElementById("card-deck");

//moves variable
let moves = 0
let counter = document.querySelector('.moves');

//variables for rating
let ratingStars = document.querySelectorAll('.fa-star');

let starList = document.querySelectorAll('.stars li');

//matched cards
let matchedCards = document.getElementsByClassName('match');

//open cards array
let openCards = [];

//modal
var modal = document.getElementById('modal');

var closeModal = document.getElementsByClassName("modalClose")[0];


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


//initialize game (call shuffle function, clear all classes, reset move counter, reset rating)
/*   + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 	//clear all existing classes from cards
 	//card.classList.remove('open', 'show', 'disabled', 'matched', 'unmatched');	


window.onload = initGame();
console.log (shuffle(cards));


function initGame(){
	cards = shuffle(cards);
	//remove existing classes
	
	
};


//declate event listener, push open cards into an array, test cards for match if 2 cards open
cards.forEach(function(card){
	card.addEventListener('click', function(e){
		this.classList.add('open', 'show', 'disabled');
		
		if (card.classList.contains('open') || card.classList.contains('show')){
		openCards.push(card);
	 }
		if (openCards.length === 2){
			test();
		}
  })
});

//function to test if cards match
function test() {
		
			let cardOneType = openCards[0].dataset.card;
			let cardTwoType = openCards[1].dataset.card;
		
				if (cardOneType === cardTwoType) {
					matched();
				} else {
					unmatched();
				}
};

//what board looks like when cards match
function matched(){
	openCards[0].classList.add('match', 'disabled');
	openCards[1].classList.add('match', 'disabled');
	setTimeout(function(){
		openCards[0].classList.remove('show', 'open');
		openCards[1].classList.remove('show', 'open');
		openCards = [];
		console.log(openCards);
	}, 1000);
};


//what board looks like when cards don't match
function unmatched(){
		openCards[0].classList.add('unmatched', 'disabled');
		openCards[1].classList.add('unmatched', 'disabled');
	setTimeout(function(){
		openCards[0].classList.remove('show', 'open', 'unmatched', 'disabled');
		openCards[1].classList.remove('show', 'open', 'unmatched', 'disabled');
		openCards = [];
	}, 1000);
};

//Congratulations modal

function congratsModal() {
	if (matchedCards.length == 16) {
		modal.classList.add('show');
	}
};
congratsModal();


/*btn.onclick = function() {
    modal.style.display = "flex";
};*/

closeModal.onclick = function() {
    modal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};



