const wordApp = {}

// Declare variables
wordApp.apiUrl = 'https://api.datamuse.com/words';
wordApp.form = document.querySelector('form')
const ul = document.querySelector('ul');
const moreButton = document.querySelector('#moreWords');

//  Helper function to make and display list items
wordApp.displayItem = (wordsOnPage) => {
    const listItem = document.createElement('li');
    listItem.textContent = wordsOnPage;
    ul.appendChild(listItem);
}

wordApp.init = () => {
    wordApp.formSubmit();
}

wordApp.moreWords = (jsonResponse) => {
    moreButton.addEventListener('click', () => {
         //  Get first 10 words
        const words = jsonResponse.slice (11, 21);
        // then create list items and append to ul 
        words.forEach( (word) => {
        wordApp.displayItem(word.word);
        })
    })
}


wordApp.displayWords = (jsonResponse) => {
    console.log(jsonResponse)
    const resultsDiv = document.querySelector('.resultsClass');
    //  Check if all inputs are empty
    if (meaning.value === '' && startsWith.value === '' && endsWith.value === '') {
        wordApp.displayItem('Fill in at least one field to get results')
        document.querySelector('li').classList.add('error');
    } else if (jsonResponse.length === 0) {
        wordApp.displayItem('Search too specific no results')
        document.querySelector('li').classList.add('error');
    } else {
        //  Get first 10 words
        const words = jsonResponse.slice(0,10);
        // then create list items and append to ul 
        words.forEach( (word) => {
            wordApp.displayItem(word.word)
        });
        // Make button visible
        moreButton.classList.remove('invisible');
    }
    // toggle visibility class 
    resultsDiv.classList.remove('invisible');
    //  listen for click on more words button and show new words
    wordApp.moreWords(jsonResponse);
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



