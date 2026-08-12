import { openDB } from 'idb';

const dbPromise = openDB('flashcards-db', 1, {
    upgrade(db) {
        if (!db.objectStoreNames.contains('cards')) {
            db.createObjectStore('cards', { keyPath: 'id', autoIncrement: true });
        }
    },
});

async function addCard(front, back) {
    try {
        const db = await dbPromise;
        const transaction = db.transaction(['cards'], 'readwrite');
        const store = transaction.objectStore('cards');
        const request = store.add({ front, back });

        request.onsuccess = () => {
            console.log('Card added successfully!');
        };

        request.onerror = (event) => {
            console.error('Error adding card:', event.target.error);
        };
    } catch (error) {
        console.error('Database error:', error);
    }
}

async function fetchCards() {
    try {
        const db = await dbPromise;
        const transaction = db.transaction(['cards'], 'readonly');
        const store = transaction.objectStore('cards');
        return await store.getAll();
    } catch (error) {
        console.error('Database error:', error);
    }
}

async function showAllCards() {
    const cards = await fetchCards();
    const cardList = document.getElementById('card-list');
    cardList.innerHTML = '';

    if (cards.length === 0) {
        cardList.innerHTML = '<p>No cards found.</p>';
    } else {
        cards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.innerHTML = `<h2>${card.front}</h2><button onclick="flipCard()">Flip</button>`;
            cardList.appendChild(cardElement);
        });
    }
}

// Optionally, display all cards when the page loads
window.onload = () => {
    showAllCards();
};
