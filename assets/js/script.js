document.addEventListener('DOMContentLoaded', () => {
    const flashcardsContainer = document.getElementById('flashcards');
    let flashcards = JSON.parse(localStorage.getItem('flashcards')) || 
[];

    // Function to render flashcards
    function renderFlashcards() {
        flashcardsContainer.innerHTML = '';
        flashcards.forEach((card, index) => {
            const li = document.createElement('li');
            li.textContent = `${card.question} - ${card.answer}`;
            
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.addEventListener('click', () => editCard(index));
            
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => 
deleteCard(index));
            
            li.appendChild(editBtn);
            li.appendChild(deleteBtn);
            flashcardsContainer.appendChild(li);
        });
    }

    // Function to add a new card
    function addCard() {
        const question = 
document.getElementById('new-card-question').value;
        const answer = document.getElementById('new-card-answer').value;

        if (question && answer) {
            flashcards.push({ question, answer });
            localStorage.setItem('flashcards', 
JSON.stringify(flashcards));
            renderFlashcards();
            document.getElementById('new-card-question').value = '';
            document.getElementById('new-card-answer').value = '';
        }
    }

    // Function to edit a card
    function editCard(index) {
        const question = prompt('Enter new question:', 
flashcards[index].question);
        const answer = prompt('Enter new answer:', 
flashcards[index].answer);

        if (question && answer) {
            flashcards[index] = { question, answer };
            localStorage.setItem('flashcards', 
JSON.stringify(flashcards));
            renderFlashcards();
        }
    }

    // Function to delete a card
    function deleteCard(index) {
        flashcards.splice(index, 1);
        localStorage.setItem('flashcards', JSON.stringify(flashcards));
        renderFlashcards();
    }

    // Event listeners
    document.getElementById('add-card').addEventListener('click', 
addCard);

    // Render initial flashcards
    renderFlashcards();
});
