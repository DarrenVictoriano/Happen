// Nav bar mobile activator
$(document).ready(function () {
    $('.sidenav').sidenav();
    // Nav bar mobile end
    var articleArr = [];
    var url = "https://newsapi.org/v2/everything";

    var apiKey = "24b53f80c69f4ab19dd055a85ee42bca";

    var keyword = "?q=lifehack productive";
    var lang = "&language=en";
    var from = "&from=2019-01-01";
    var result = ""

    var queryURL = url + keyword + lang + from + "&apiKey=" + apiKey;


    // Write code between the dashes below to hit the queryURL with $ajax, then take the response data
    // and display it in the div 

    // ------YOUR CODE GOES IN THESE DASHES. DO NOT MANUALLY EDIT THE HTML ABOVE.


    var corsProxy = "https://cors-anywhere.herokuapp.com/";
    var endpointUrl = "https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en";
    var fullUrl = corsProxy + endpointUrl;

    function getQuote() {
        $.ajax({
            url: fullUrl,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            console.log('author', response.quoteAuthor)
            var newAuthor = response.quoteAuthor
            $("#inspirational-quote").text("-" + newAuthor)

            console.log(response.quoteAuthor);
            $("#inspirational-quote").text(JSON.stringify(response.quoteText));

        });
    }

    setInterval(getQuote, 10000);

    // Ajax call to News Article API


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $(".articles-ajax").empty();
        // Logs the articles portion of the response
        console.log(response.articles);
        console.log(queryURL);
        articleArr = response.articles;
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
            var artSummary = $('<p>' + resultDesc + '</p>');
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