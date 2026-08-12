let isFlipped = false;

function flipCard() {
    const card = document.getElementById('flashcard');
    if (isFlipped) {
        card.innerHTML = `<h2>Front Side</h2><button onclick="flipCard()">Flip</button>`;
    } else {
        card.innerHTML = `<h2>Back Side</h2><button onclick="flipCard()">Flip</button>`;
    }
    isFlipped = !isFlipped;
}
