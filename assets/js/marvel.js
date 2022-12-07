// marvel api keys
var key = '17df38d3f4b222ca109def2087cb8269';
var privateKey = '0911a2704889d61c5d4788bcb2dcc039e08e777c';

// hash via md5 generator
var hash = '700588d4fba17a2c0d05eb1d655c1984';

// for characters
var base = `http://gateway.marvel.com/v1/public/characters?ts=1&apikey=${key}&hash=${hash}`

// only 1 input element, use as variable
var characterInput = document.querySelector('input');

// handles any submit, any query for a character
var formSubmit = function(event) { 
    // stops page from reloading
    event.preventDefault();
    
    // variable for input field value aka searched marvel character
    var characterName = characterInput.value.trim();

    // sends value to getCharacterRepos to search for character in api
    if(characterName) {
        getCharacterRepos(characterName);
        getWikiRepos(characterName);
    }
}

// right now that character parameter is hulk
var getCharacterRepos = function(character) {
    var apiUrl = `https://gateway.marvel.com/v1/public/characters?name=${character}&ts=1&apikey=${key}&hash=${hash}`

    // could be neater, grabs data from the results when searching for inputted value
    fetch(apiUrl)
        .then(function(response) {
            console.log('success!')  
                return response.json()
                    .then(function(data) {
                        console.log(data.data.results);
                        var results = data.data.results;
                        console.log(results);
                        displayCharacterCard(results)
            });
        });         
    };
            
// function to display card underneath input field
// todo: append new card under #results, append character info into card
var displayCharacterCard = function(searchedCharacter) {
    if (searchedCharacter) {
        // checked to see if info is being grabbed from objects
        console.log(searchedCharacter[0].thumbnail.path +'.jpg');
        console.log(searchedCharacter[0].name);
        console.log(searchedCharacter[0].description);
        // need to create elements below
    };
};


var characterForm = document.querySelector('form');

// event listener when user searches character name
// add something to clear input field
characterForm.addEventListener('submit', formSubmit);

