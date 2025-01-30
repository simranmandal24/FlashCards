const termInput = document.getElementById('terminput');
const definitionInput = document.getElementById('definitionInput');
const saveButton = document.getElementById('saveButton');
const nextButton = document.getElementById('nextButton');
const flashCardContainer = document.getElementById('flashcardContainer');

// Load flashcards from localStorage
function loadFlashcards() {
    const savedFlashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
    savedFlashcards.forEach(card => createFlashcard(card.term, card.definition));
}

// Save flashcards to localStorage
function saveFlashcards() {
    const flashcards = [];
    document.querySelectorAll('.card').forEach(flashcard => {
        const term = flashcard.querySelector('h3').textContent;
        const definition = flashcard.querySelector('p').textContent;
        flashcards.push({ term, definition });
    });
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
}

// Create a flashcard with delete functionality
function createFlashcard(term, definition) {
    const flashcard = document.createElement('div');
    flashcard.classList.add('card');
    flashcard.innerHTML = `
        <h3>${term}</h3>
        <p>${definition}</p>
        <button class="deleteButton">Discard</button>
    `;
    
    // Append to container
    flashCardContainer.appendChild(flashcard);

    // Add delete functionality
    const deleteButton = flashcard.querySelector('.deleteButton');
    deleteButton.addEventListener('click', () => {
        flashCardContainer.removeChild(flashcard);
        setTimeout(saveFlashcards, 0); // Ensure storage updates after removal
    });
}

// Show definition input when a term is entered
termInput.addEventListener('input', () => {
    definitionInput.style.display = termInput.value.trim() ? "block" : "none";
});

// Save a new flashcard
saveButton.addEventListener('click', () => {
    const term = termInput.value.trim();
    const definition = definitionInput.value.trim();

    if (term && definition) {
        createFlashcard(term, definition);
        saveFlashcards();

        // Clear inputs
        termInput.value = '';
        definitionInput.value = '';
        definitionInput.style.display = 'none';
    } else {
        alert('Please enter both a term and a definition.');
    }
});

// Save and clear input fields when clicking "Next"
nextButton.addEventListener('click', () => {
    const term = termInput.value.trim();
    const definition = definitionInput.value.trim();

    if (term && definition) {
        createFlashcard(term, definition);
        saveFlashcards();  // Save before clearing
    }

    termInput.value = '';
    definitionInput.value = '';
    definitionInput.style.display = 'none';
});

// Load flashcards on page load
document.addEventListener('DOMContentLoaded', loadFlashcards);
