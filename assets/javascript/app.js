/* PseudoCode
    .Create standard list of animals to appear on page
    .Create buttons on page using list of animals
    .When button is clicked, 10 gifs will populate page related to that button's term
    .All gifs will appear as still, but when clicked they will play and if clicked a second time, they will pause again
    .Filter Gifs to show only PG gifs
    .User entry & submission will create new button on page that will also serve same function as existing buttons
*/

var topics = ["puppy eyes", "coffee", "excited cow", "angry alligator", "penguins", "friends", "hillary duff", "grapes of wrath", "hippo", "aerobics", "giraffes"];

function renderButtons() {
    $("#animalButtons").empty();
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("animalBtn btn btn-outline-info");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#animalButtons").append(a);
    }
}

function displayGifs () {
    
    $('#gifs-view').empty();
    $('#play').empty();

    $('#play').append('Click on each GIF to play or pause!')
    
    var topic = $(this).attr("data-name");
    var apiKey = "grb3dUIIeN8m2pT86jm2rJk7a3u9MWRg";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&limit=16&rating=pg&api_key=" + apiKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){

        console.log(response.data);

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

$(document).on('click', '.animalBtn', displayGifs);

$(document).on('click', '#submit', function () {
    event.preventDefault();
    $("#error").html("&nbsp;");
    var userInput = $("#animal-input").val();
    if (userInput) {
        topics.push(userInput);
        renderButtons();
        $('#animal-input').val('');
    } else {
        $("#error").append('Please enter a topic.');
    }
});

renderButtons();








