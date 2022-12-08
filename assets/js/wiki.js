
// api url
var url = "https://en.wikipedia.org/w/api.php?"; 

// note
// ${url}action=query&titles=${characterName}

// input field value
// is characterName from formSubmit

// http request method
// var xhr = new XMLHttpRequest();

var getWikiRepos = function(wiki) {
    var api = `${url}action=query&origin=*&format=json&titles=${wiki}&prop=info&inprop=url`;
    
    fetch(api)
        .then(function(response) {
            return response.json()
                .then(function(data) {
                    console.log(data.query.pages);
                    var wikiResults = data.query.pages;
                    displayWiki(wikiResults);
                    console.log(wikiResults);   
        })
    })
}

var displayWiki = function(wikiLink) {
    for (var i in wikiLink) {
        console.log(wikiLink[i].fullurl);
    }
}


var url = 'https://en.wikipedia.org/w/api.php?'





var getWikiRepos = function(wiki) {
    
    var api = `${url}action=query&origin=*&format=json&titles=${wiki}&prop=info&inprop=url`;

        fetch(api)

            .then(function(response) {
    
                return response.json()
    
                    .then(function(data) {
        
                        console.log(data.query.pages);
        
                            for (var i in data.query.pages) {
            
                                console.log(data.query.pages[i].fullurl);
                            }
            })
    })
}
// var xhr = new XMLHttpRequest();

// var getWikiRepos = function(wiki) {
//     var api = `${url}action=query&origin=*&titles=${wiki}&prop=info&inprop=url`

//     
//     xhr.open('GET', url, true);
    
//     
//     xhr.onload = function() {
//         
//         var data = JSON.parse(this.response);
    
//         
//         console.log(data);
    
//         
//         console.log(data.query.pages)
    
//         
//         
//         for (var i in data.query.pages) {
//             console.log(data.query.pages[i].title);
//         }
//     }
//     
//     xhr.send();
// }

