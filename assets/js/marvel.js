// marvel api keys
var key = '17df38d3f4b222ca109def2087cb8269';
// var privateKey = '0911a2704889d61c5d4788bcb2dcc039e08e777c';

// hash via md5 generator
var hash = '700588d4fba17a2c0d05eb1d655c1984';

// for characters
// https://gateway.marvel.com/v1/public/characters?name=timmyturner&ts=1&apikey=17df38d3f4b222ca109def2087cb8269&hash=700588d4fba17a2c0d05eb1d655c1984

// query url example for hulk
// https://gateway.marvel.com/v1/public/characters?name=hulk&ts=1&apikey=17df38d3f4b222ca109def2087cb8269&hash=700588d4fba17a2c0d05eb1d655c1984

// only 1 input element, use as variable
var characterInput = document.querySelector('input');

const cardcontainer = document.getElementById("resultcard");

// handles any submit, any query for a character
var formSubmit = function (event) {
    // stops page from reloading
    event.preventDefault();

    // variable for input field value aka searched marvel character
    var characterName = characterInput.value.trim();
    characterForm.reset();

    // sends value to getCharacterRepos to search for character in api
    if (characterName) {
        getCharacterRepos(characterName);
        getWikiRepos(characterName);
    }
}

// right now that character parameter is 
var getCharacterRepos = function (character) {
    var apiUrl = `https://gateway.marvel.com/v1/public/characters?name=${character}&ts=1&apikey=${key}&hash=${hash}`

    // could be neater, grabs data from the results when searching for inputted value
    fetch(apiUrl)
        .then(function (response) {
            console.log('success!')
            return response.json()
                .then(function (data) {
                    // error message when characters around found
                    if (data.data.count === 0) {
                        console.log('not found');
                        var error = $("<p></p>").text("This is not a character");

                        $(cardcontainer).append(error);
                        $("#resultcard").attr('style', 'display: inline-block;');
                       
                        return;
                    }

                    console.log(data.data.count);

                    var results = data.data.results;

                    console.log(results);
                    displayCharacterCard(results);

                });
        });
};


// function to display card underneath input field
// todo: append new card under #results, append character info into card

var displayCharacterCard = function (searchedCharacter) {
    if (searchedCharacter) {

        // checked to see if info is being grabbed from objects
        console.log(searchedCharacter[0].thumbnail.path + '.jpg');
        console.log(searchedCharacter[0].name);
        console.log(searchedCharacter[0].description);

        cardcontainer.setAttribute('display', 'visible');
        var thumbnail = searchedCharacter[0].thumbnail.path + '.jpg';
        document.getElementById("thumbnail").src = `${thumbnail}`;
        var name = searchedCharacter[0].name;

        var description = searchedCharacter[0].description;
        var resultcard = document.querySelector('#resultcard');

        //document.getElementById("resultcard").innerHTML  = `${thumbnail}`;
        document.getElementById("resultcard").innerHTML = `${name}`;
        document.getElementById("result").innerHTML = `${description}`;
        //document.getElementById("thumbnail").innerHTML = `${createImg}`;
        resultcard.append(createImg);
    };

};

$('#result').on('')

function renderResults() {
    $('#result').empty();


}
renderResults();

var characterForm = document.querySelector('form');
characterForm.addEventListener('submit', formSubmit);
