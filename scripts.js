// scripts.js

// Function to fetch Bible chapter or verse
async function fetchChapterOrVerse(book, chapter, verse = null) {
    let url;
    if (verse) {
        // If a specific verse is provided, fetch that verse
        url = `https://bible-api.com/${book}+${chapter}:${verse}`;
    } else {
        // Otherwise, fetch the entire chapter
        url = `https://bible-api.com/${book}+${chapter}`;
    }

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        displayResult(data.text); // Show the Bible text
    } catch (error) {
        displayError(error.message);
    }
}

// Function to display fetched data
function displayResult(text) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<pre>${text}</pre>`;
}

// Function to display error
function displayError(message) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<p style="color: red;">${message}</p>`;
}

// Add event listener to the button
document.getElementById('fetch-btn').addEventListener('click', () => {
    const book = document.getElementById('book').value.trim();
    const chapter = document.getElementById('chapter').value.trim();
    const verse = document.getElementById('verse').value.trim();

    if (book && chapter) {
        fetchChapterOrVerse(book, chapter, verse || null); // Pass verse only if it's provided
    } else {
        displayError('Please enter both a book name and chapter number.');
    }
});
