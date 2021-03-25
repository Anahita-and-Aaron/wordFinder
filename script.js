const wordApp = {}

// Declare variables
wordApp.apiUrl = 'https://api.datamuse.com/words';
wordApp.form = document.querySelector('form')

wordApp.init = () => {
    wordApp.formSubmit();
}

wordApp.formSubmit = () => {
    //  listen for submit event on the form
    wordApp.form.addEventListener('submit', (event) => {
        //  prevent page refresh
        event.preventDefault();

        // Store values for each input in variables
        const meaning = document.getElementById('meaning').value;
        const startsWith = document.getElementById('startsWith').value;
        const endsWith = document.getElementById('endsWith').value;
        console.log(meaning, startsWith, endsWith);
        
        //  Build url using variables
        console.log(wordApp.buildUrl(meaning, startsWith, endsWith));

        // wordApp.getWords();
    })
}

wordApp.buildUrl = (meaning, startsWith, endsWith) => {
    const url = new URL(wordApp.apiUrl);
        url.search = new URLSearchParams({
            ml: meaning,
            sp: `${startsWith}*${endsWith}`
        })
        return url;
}

// wordApp.getWords = () => 


wordApp.init();



//         fetch(url)
//         .then((response) => {
//             return response.json();
//         })
//         .then((jsonResponse) => {
//             console.log(jsonResponse)
//         })