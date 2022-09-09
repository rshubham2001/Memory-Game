const cards = document.querySelectorAll(".card");
cards.forEach(card => card.addEventListener("click", flipCard))

var count = 0;  //corect moveed cards
var moves = 0; // number of moves used

let hasflipedCard = false;
let lockBoard = false;
let firstCard, secondCard;
function flipCard() {
    if (lockBoard) return;

    if (this === firstCard) return;

    this.classList.toggle('flip');
    moves++;
    console.log(moves);
    countMoves();

    if (!hasflipedCard) {
        //the card is clicked first time
        hasflipedCard = true;
        firstCard = this;
        return;
    }

    //secondCard click

    secondCard = this;
    //do card match?
    checkforMatch();

}

function checkforMatch() {
    let isMatch = firstCard.dataset.image === secondCard.dataset.image;

    isMatch ? disableCard() : unflipCard();
}

function disableCard() {
    count++;
    showWin();
    //counting correct matched cards
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    resetBoard()
}

function unflipCard() {


    lockBoard = true;

    setTimeout(() => {
        shakeBoard();
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        resetBoard();
    }, 800);
}

function resetBoard() {
    [hasflipedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function shakeBoard() {
    const board = document.querySelector(".board")
    setTimeout(() => {
        board.classList.remove("shake");
    }, 350);
    board.classList.add("shake");
}

(function shuffleBoard() {
    cards.forEach(card => {
        let randdomPos = Math.floor(Math.random() * 16);
        card.style.order = randdomPos;
    })
})();

const refresh = document.getElementById("refresh");
refresh.addEventListener("click", () => window.location.reload());


const modal = document.querySelector(".modal");
const modal2 = document.querySelector(".modal2");
const closeButton = document.querySelector(".close-button");
const closeButton2 = document.querySelector(".close-button2");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function toggleModal2() {
    modal2.classList.toggle("show-modal");
}

if (closeButton !== null) {
    closeButton.addEventListener("click", toggleModal);
}
closeButton2.addEventListener("click", toggleModal2);

const msg = document.getElementById("msg");
function showWin() {
    if (count == (cards.length) / 2) {
        msg.innerHTML = msg.innerHTML + `${moves}`;
        toggleModal2();
        setTimeout(() => {
            refresh.click();
        }, 3000);
    }
}

const move = document.getElementById("move");

function countMoves() {
  
    if (move !== null) {
        move.innerHTML = move.innerHTML - 1;
        if (moves == 15) {
            toggleModal();
            setTimeout(() => {
                refresh.click();
            }, 3000);
        }
    }

}

const level2 = document.getElementById("level2");
if (level2 !== null) {
    level2.addEventListener("click", () => {
        location.href = 'index.html';
    });
}
const level1 = document.getElementById("level1");
if (level1 !== null) {
    level1.addEventListener("click", () => {
        location.href = 'hard.html';
    });
}

const msg2 = document.getElementById("msg2");

if (move !== null) {
    setTimeout(() => {
        msg2.innerHTML = "Sorry! you ran out of time.";
        toggleModal();
        setTimeout(() => {
            window.location.reload();
        }, 2000);
     }, 40000);
 }