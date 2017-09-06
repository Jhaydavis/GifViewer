//create the arry
var gifs = ["Game of Thrones", "Epic Fail", "Slippery", "Punched", "Drunk"];
// set up listener for clicking a button
function displayGifInfo() {
    $(".item").empty();
   

    var gif = $(this).attr("data-gif");
    var gifsToLoad = 2;
    //var state = $(this).data("data-state", "playing");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gif + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function (response) {


            var results = response.data;


            for (var i = 0; i <= gifsToLoad; i++) {
                var gifDiv = $("<div class='item'>");


                var rating = results[i].rating;
                var p = $("<h4>").html("Rating: " + rating);
                var h = $("<h3>").html("Category: " + gif);

                var gifImage = $("<img>");

                gifImage.attr("src", results[i].images.fixed_height.url);
                gifImage.addClass(gifImage);
                var state = gifImage.data("data-state", "isPlaying")
                console.log(state);




                gifDiv.append(gifImage);
                gifDiv.append(h);
                gifDiv.append(p);
                // if click of .this class of item -> show still imgage


                $("#gifs-appear-here").prepend(gifDiv);

            };
        });
};


// I'm trying to detect when someone clicks on the gif image not working
function toggleGif() {

    alert(state);
};


function renderButtons() {



    $("#buttons-view").empty();
    // Looping through the array of gifs
    for (var i = 0; i < gifs.length; i++) {

        var addedGif = $("<button>");
        addedGif.addClass("gif");
        addedGif.attr("data-gif", gifs[i]);
        addedGif.text(gifs[i]);
        $("#buttons-view").append(addedGif);
        $("#gif-input").val(" ");
    };
};

// add button from user search

$("#add-gif").on("click", function (event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    var gif = $("#gif-input").val().trim();

    // Adding movie from the textbox to our array
    gifs.push(gif);
    $("#gif-input").val(" ");

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});
renderButtons();
$(document).on("click", ".gif", displayGifInfo);
$(document).on("click", ".item", toggleGif);

