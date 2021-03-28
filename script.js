const wordApp = {}

// Declare variables
wordApp.apiUrl = 'https://api.datamuse.com/words';
wordApp.form = document.querySelector('form')
const ul = document.querySelector('ul');

wordApp.init = () => {
    wordApp.formSubmit();
}

wordApp.displayWords = (jsonResponse) => {
    // get first 10 data items from API
    const words = jsonResponse.slice(0,10);
    // then create list items and append to ul 
    words.forEach( (word) => {
        const listItem = document.createElement('li');
        listItem.textContent = word.word;
        ul.appendChild(listItem);
    });

    // toggle visibility class 
    const resultsDiv = document.querySelector('.resultsClass');
    resultsDiv.classList.remove('invisible');
}

wordApp.getWords = (url) => {
    fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((jsonResponse) => {
        wordApp.displayWords(jsonResponse);
    })
}

wordApp.buildUrl = (meaning, startsWith, endsWith) => {
    const url = new URL(wordApp.apiUrl);
        url.search = new URLSearchParams({
            ml: meaning,
            sp: `${startsWith}*${endsWith}`,
        })
        wordApp.getWords(url);
}

wordApp.formSubmit = () => {
    //  listen for submit event on the form
    wordApp.form.addEventListener('submit', (event) => {
        //  prevent page refresh
        event.preventDefault();
        ul.innerHTML = '';
        // Store values for each input in variables
        const meaning = document.getElementById('meaning').value;
        const startsWith = document.getElementById('startsWith').value;
        const endsWith = document.getElementById('endsWith').value;
        //  Build url using variables
        wordApp.buildUrl(meaning, startsWith, endsWith);
        const input = document.querySelectorAll('input');

    })
}









wordApp.init();



