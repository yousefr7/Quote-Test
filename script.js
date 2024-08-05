const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const xBtn = document.getElementById('x');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
//loading
function loading() {
    quoteContainer.hidden = true;
    loader.hidden = false;
}
//complete
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}
let apiQuotes = [];
//show new quote
function newQuote() {
    loading();
    // pick a random quote from api
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // check if author field is blank and replace it with 'unkown'
    if (!quote.author) {
        authorText.textContent = 'unknown';
    } else {
        authorText.textContent = quote.author;
    }
    //check quote length to determind styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');

    }
    complete();
    quoteText.textContent = quote.text;
}
// Get Quotes from API
async function getQuotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // catch erorr here

    }
}
//tweet the quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_black');
}
//event listen
newQuoteBtn.addEventListener('click', newQuote);
xBtn.addEventListener('click', tweetQuote)
//on load
getQuotes();
