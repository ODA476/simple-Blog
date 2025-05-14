let quotes = [];

// Fetching data from the API
async function fetchQuotes() {
  displayLoading();
  try {
    const response = await fetch('https://dummyjson.com/quotes');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    quotes = data.quotes;
    console.log(quotes);
    displayQuotes(quotes);
  } catch (error) {
    displayError('Error fetching quotes. Please try again later.');
  } finally {
    hideLoading();
  }
}


// Displaying quotes in the list
function displayQuotes(quotesToDisplay) {
  const quoteList = document.getElementById('quoteList');
  quoteList.innerHTML = '';
  quotesToDisplay.forEach(quote => {
    const li = document.createElement('li');
    li.className = 'quote';
    li.textContent = `${quote.quote}`;
    quoteList.appendChild(li);
  });
}

// Filtering quotes based on user input
function filterQuotes() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const filteredQuotes = quotes.filter(quote =>
    quote.quote.toLowerCase().includes(searchInput)
  );
  displayQuotes(filteredQuotes);
}

// Displaying loading message
function displayLoading() {
  const loading = document.getElementById('loading');
  loading.textContent = 'Loading...';
}

// Hiding loading message
function hideLoading() {
  const loading = document.getElementById('loading');
  loading.textContent = '';
}

// Displaying error message
function displayError(message) {
  const errorMessage = document.getElementById('errorMessage');
  errorMessage.textContent = message;
}

// At initial load, fetch the quotes
window.onload = fetchQuotes;
document.getElementById('searchInput').addEventListener('keyup', filterQuotes);
