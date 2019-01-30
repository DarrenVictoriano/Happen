// Nav bar mobile activator
$(document).ready(function() {
    $('.sidenav').sidenav();
// Nav bar mobile end
    
    var url = "https://newsapi.org/v2/everything";

    var apiKey = "fb3792690aa84954aeb7141705a16f78";
    
    var keyword = "?q=lifehack productive";
    var lang = "&language=en";
    var from = "&from=2019-01-01";

    var queryURL = url + keyword + lang  + from + "&apiKey=" + apiKey;

    // Ajax call to News Article API
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        // Logs the articles portion of the response
        console.log(response.articles);
        // Stores each article as an array in a variable titled responseArray
        var responseArray = response.articles
        // Loops through each article in the  responseArray
        for (i = 0; i < responseArray.length; i++) {
            console.log(responseArray[i].url);
            
            // Variables that store each desired item from response 
            // object to append to a dynamically created Article div
            var resultTitle = responseArray[i].title;
            var resultImage = responseArray[i].urlToImage;
            var resultDesc = responseArray[i].description;
            var resultURL = responseArray[i].url;

            // Variables that create elements for each item
            var artHeading = $('<h5>' + resultTitle + '</h5>');
            var artImage = $('<img src="' + resultImage + '">' + '</img>');
            var artSummary = $('<p>'+ resultDesc + '</p>');
            var artHyperlink = $('<a href="' + resultURL + '">' + resultURL + '</a>' + '<br>');

            // Grabs existing div for articles and dynamically
            // creates and appends items from each article
            $("#productivity-articles")
            .append($('<div>').addClass('articles-ajax')
            .append(artHeading)
            .append((artImage).addClass('img-ajax'))
            .append(artSummary)
            .append(artHyperlink));            
        };
    });
        
});