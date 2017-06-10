var axios = require("axios"); 

var authKey = "43d21e8ec1e14ddf9626698e4f253801";

// These variables will hold the results we get from the user's inputs via HTML
var searchTerm = "";
var numResults = 0;
var startYear = 2015;
var endYear = 0;

var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
  authKey + "&q=";

// Counter to keep track of article numbers as they come in
var articleCounter = 0;

//PLaceholder to test query

// queryURLBase + "pandas" + "&begin_date=" + startYear + "0101" 
var helper = {

    runQuery: function() {
        
        var queryTest = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=43d21e8ec1e14ddf9626698e4f253801&q=pandas&begin_date=20150101"

        return axios.get(queryTest).then(function(nytData) {
          if (nytData.data.response.docs[0]) {
                console.log(nytData.data.response.docs[0].headline.main); 
               return nytData.data.response.docs[0].headline.main; 
            }
            return ""; 
        }) 
        
    }, 
    getSaved: function() {
        return axios.get("/api"); 
    }, 
    postSaved: function(title) {
        return axios.post("/api", { title: title})
    }
}; 
 
module.exports = helper; 