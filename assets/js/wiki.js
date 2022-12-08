// api url
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