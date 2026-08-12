const dbPromise = idb.open('flashcards-db', 1, (upgradeDb) => {
    if (!upgradeDb.objectStoreNames.contains('cards')) {
        upgradeDb.createObjectStore('cards', { keyPath: 'id', autoIncrement: true });
    }
});

let isFlipped = false;

async function flipCard() {
    const card = document.getElementById('flashcard');
    if (isFlipped) {
        card.innerHTML = `<h2>Front Side</h2><button onclick="flipCard()">Flip</button>`;
    } else {
        card.innerHTML = `<h2>Back Side</h2><button onclick="flipCard()">Flip</button>`;
    }
    isFlipped = !isFlipped;
}

async function addCard() {
    const front = document.getElementById('front').value;
    const back = document.getElementById('back').value;

    if (front && back) {
        try {
            const db = await dbPromise;
            const transaction = db.transaction(['cards'], 'readwrite');
            const store = transaction.objectStore('cards');
            const request = store.add({ front, back });

            request.onsuccess = () => {
                alert('Card added successfully!');
                document.getElementById('front').value = '';
                document.getElementById('back').value = '';
            };

            request.onerror = (event) => {
                console.error('Error adding card:', event.target.error);
                alert('Failed to add card.');
            };
        } catch (error) {
            console.error('Database error:', error);
            alert('Database error. Please try again later.');
        }
    } else {
        alert('Both front and back sides are required.');
    }
}

async function fetchCards() {
    const db = await dbPromise;
    const transaction = db.transaction(['cards'], 'readonly');
    const store = transaction.objectStore('cards');
    return await store.getAll();
}

// Optionally, you can display cards on load or provide a button to view all cards
