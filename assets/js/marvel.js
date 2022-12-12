// marvel api keys
var key = '17df38d3f4b222ca109def2087cb8269';
// var privateKey = '0911a2704889d61c5d4788bcb2dcc039e08e777c';

// hash via md5 generator
var hash = '700588d4fba17a2c0d05eb1d655c1984';

// wikipedia base url
var url = 'https://en.wikipedia.org/w/api.php?'

var characterInput = document.querySelector('input');
var form = document.querySelector('form');
const cardcontainer = document.getElementById("resultcard");


// handles any submit, any query for a character
var formSubmit = function (event) {
    // stops page from reloading
    event.preventDefault();

    // variable for input field value aka searched marvel character
    var characterName = characterInput.value.trim();
    localStorage.setItem('character-value', characterName);
    characterForm.reset();

    // sends value to getCharacterRepos to search for character in api
    if (characterName) {
        getCharacterRepos(characterName);

    }
}

// right now that character parameter is 
var getCharacterRepos = function (character) {
    var apiUrl = `https://gateway.marvel.com/v1/public/characters?name=${character}&ts=1&apikey=${key}&hash=${hash}`

    // grabs data from the results when searching for inputted value
    fetch(apiUrl)
        .then(function (response) {
            console.log('success!')
            return response.json()
                .then(function (data) {
                    // error message when characters around found
                    if (data.data.count === 0) {
                        clearcard();
                        console.log('not found');
                        var error = $("<p></p>").text("This is not a character");

                        $(cardcontainer).append(error);
                        $("#resultcard").attr('style', 'display: inline-block;');

                        return;
                    }

                    clearcard();
                    console.log(data.data.count);

                    var results = data.data.results;

                    console.log(results);
                    displayCharacterCard(results);

                }).then(function () {
                    getWikiRepos(character);
                })
        });
};


var getWikiRepos = function (wiki) {
    var api = `${url}action=query&origin=*&format=json&titles=${wiki}&prop=info&inprop=url`;
    fetch(api)
        .then(function (response) {
            return response.json()
                .then(function (data) {
                    console.log(data.query.pages);
                    var wiki
                    for (var i in data.query.pages) {
                        wiki = data.query.pages[i].fullurl;
                        console.log(data.query.pages[i].fullurl);
                    }
                    return wiki
                }).then(function (wiki) {
                    console.log(wiki);
                    displayWikiLink(wiki);
                })
        })
}

var displayWikiLink = function (url) {
    if (url) {

        console.log(url);
        console.log($('.wikipedia'));
        $('.wikipedia').attr("href", url);

    }
}

// function to display card underneath input field
var displayCharacterCard = function (searchedCharacter) {
    if (searchedCharacter) {

        // checked to see if info is being grabbed from objects
        console.log(searchedCharacter[0].thumbnail.path + '.jpg');
        console.log(searchedCharacter[0].name);
        console.log(searchedCharacter[0].description);

        $("#resultcard").attr('style', 'display: inline-block; padding: 2%;');
        var thumbnail = searchedCharacter[0].thumbnail.path + '.jpg';
        var description = searchedCharacter[0].description;
        var name = searchedCharacter[0].name;
        var nameText = $(`<h2>${name}</h2>`);
        var descriptionText = $(`<p class="desc">${description}</p>`);
        var createImg = $(`<img id="thumbnail" src="${thumbnail}" />`);
        var href = $(`<a class="wikipedia">Wikipedia Link</a>`)

        $(cardcontainer).append(nameText);
        $(cardcontainer).append(createImg);
        $(cardcontainer).append(descriptionText);
        $(cardcontainer).append(href);

    };

};

var characterForm = document.querySelector('form');

characterForm.addEventListener('submit', formSubmit);

function clearcard() {
    $("#resultcard").empty();
}