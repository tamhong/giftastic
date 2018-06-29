//Array of exisiting topics

var topics = ["puppy eyes", "coffee", "excited cow", "angry alligator", "penguins", "friends", "hillary duff", "grapes of wrath", "hippo", "aerobics", "giraffes", "yay"];

//Generate buttons using array

function renderButtons() {
    $("#buttons").empty();
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("gifGen btn btn-outline-info");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#buttons").append(a);
    }
}

//DISPLAY GIFS ON PAGE

function displayGifs () {

    //empty contents to prevent repeat
    
    $('#gifs-view').empty();
    $('#play').empty();

    //add instructions on how to play/pause gifs

    $('#play').append('Click on each GIF to play or pause!')

    //API AJAX call
    
    var topic = $(this).attr("data-name");
    var apiKey = "grb3dUIIeN8m2pT86jm2rJk7a3u9MWRg";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&limit=16&rating=pg&api_key=" + apiKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){

        console.log(response.data);
        console.log(queryURL);

        //generating images by looping through API data array to display on GIFs on page

        for (var i = 0; i < response.data.length; i++) {
            var still = response.data[i].images.fixed_height_still.url;
            var move = response.data[i].images.fixed_height.url;
            var rating = response.data[i].rating;
            var eachGif= $('<section class= eachGif>');
            var img = $('<img>');
            img.addClass("gif");
            img.attr("src", still);
            img.attr("data-still", still)
            img.attr("data-animate", move)
            img.attr("data-state", "still");
            eachGif.append("<span id='rating'><strong>Rating:</strong> " + rating +"<br></span>");
            eachGif.append(img);
            $('#gifs-view').append(eachGif);

        };
    });
};

//Play/pause code

$(document).on("click", '.gif', function() {
    var state = $(this).attr("data-state");

    if(state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "move");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

//Display gifs to page  by clicking on buttons

$(document).on('click', '.gifGen', displayGifs);

//Generate new buttons of user choice

$(document).on('click', '#submit', function (event) {

    //Prevent submit button from reloading entire page

    event.preventDefault();
    $("#error").html("&nbsp;");
    var userInput = $("#input").val();

    //Only generate buttons with a value, if no value then push error

    if (userInput) {
        topics.push(userInput);
        renderButtons();
        $('#input').val('');
    } else {
        $("#error").append('Please enter a topic.');
    }
});

//Initial button load 

renderButtons();








