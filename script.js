const wordApp = {}

// Declare variables
wordApp.apiUrl = 'https://api.datamuse.com/words';
wordApp.form = document.querySelector('form');
wordApp.ul = document.querySelector('ul');
wordApp.moreButton = document.querySelector('#moreWords');
wordApp.h3 = document.querySelector('h3');

// Dictionary variables 
wordApp.dictUrl = 'https://www.dictionaryapi.com/api/v3/references/collegiate/json/';
wordApp.dictKey = 'c3f5ec42-dfcc-4f14-a2a6-f7f2df69e673';

wordApp.init = () => {
    wordApp.formSubmit();
    wordApp.getDefinition();
}

wordApp.moreWords = (jsonResponse) => {
    wordApp.moreButton.addEventListener('click', () => {
         //  Get first 10 words
        wordApp.start = wordApp.start + 10;
        wordApp.end = wordApp.end + 10;
        const words = jsonResponse.slice (wordApp.start, wordApp.end);
        // then create list items and append to ul 
        words.forEach( (word) => {
        wordApp.displayItem(word.word);
        })
    })
}

wordApp.displayWords = (jsonResponse) => {
    const resultsDiv = document.querySelector('.resultsClass');
    //  Check if all inputs are empty
    if (meaning.value === '' && soundsLike.value === '' && startsWith.value === '' && endsWith.value === '') {
        wordApp.h3.innerHTML = `We didn't find any words! Fill in at least one field to get words &#129488;`;
    } else if (jsonResponse.length === 0) {
        wordApp.h3.innerHTML =`We didn't find any words! Try a less specific search &#129488;`;
    } else {
        wordApp.h3.textContent = 'Click on word to see definition';
        //  Get first 10 words
        const words = jsonResponse.slice(wordApp.start, wordApp.end);
        // then create list items and append to ul 
        words.forEach( (word) => {
            const listItem = document.createElement('li');
            listItem.textContent = word.word;
            wordApp.ul.appendChild(listItem);
        });
        // Make button visible
        wordApp.moreButton.classList.remove('invisible');
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

wordApp.buildUrl = (meaning, soundsLike, startsWith, endsWith) => {
    const url = new URL(wordApp.apiUrl);
        url.search = new URLSearchParams({
            ml: meaning,
            sp: `${startsWith}*${endsWith}`,
            sl: soundsLike
        })
        wordApp.getWords(url);
}

wordApp.formSubmit = () => {
    //  listen for submit event on the form
    wordApp.form.addEventListener('submit', (event) => {
        //  prevent page refresh
        event.preventDefault();
        wordApp.ul.innerHTML = '';
        wordApp.moreButton.classList.add('invisible');
        wordApp.start = 0;
        wordApp.end = 10;
        // Store values for each input in variables
        const meaning = document.getElementById('meaning').value;
        const soundsLike = document.getElementById('soundsLike').value;
        const startsWith = document.getElementById('startsWith').value;
        const endsWith = document.getElementById('endsWith').value;
        //  Build url using variables
        wordApp.buildUrl(meaning, soundsLike, startsWith, endsWith);
        const input = document.querySelectorAll('input');
    })
}


wordApp.getDefinition = () => {
    wordApp.ul.addEventListener('click', (event) => {
        if (event.target.children.length !== 0) {
            event.target.removeChild(event.target.children[0]);
        } else {
            const wordInList = event.target.textContent;
            const url = new URL(`${wordApp.dictUrl}${wordInList}`);
            url.search = new URLSearchParams({
                key: wordApp.dictKey,
            })

            fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((jsonResponse) => {
                wordApp.displayDefinition(jsonResponse[0].shortdef[0], event.target); 
            })
        }
    })
}

wordApp.displayDefinition = (definition, listItem) => {
    const pElement = document.createElement('p');
    pElement.classList.add('definition');
    pElement.textContent = definition;
    listItem.appendChild(pElement);
}


wordApp.init();



