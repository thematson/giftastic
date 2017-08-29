$(document).ready(function() {



    var cartoons = ['cartman', 'mickey mouse', 'batman', 'stewie', 'scrooge mcduck', 'homer simpson'];

    renderButtons();
    // var character = $(this).attr("data-person");

    // var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=1a7853ed71024a36bbe58b12d18bf807&q=" 
    //                 + character + "&limit=10&offset=0&lang=en";

    function renderButtons() {
        $("#buttons").empty();

        for (var i = 0; i < cartoons.length; i++) {
            var c = $("<button>");
            c.addClass("cartoon btn btn-primary");
            c.attr("data-name", cartoons[i]);
            c.text(cartoons[i]);
            $("#buttons").append(c);
        }
    }

    $("#add-cartoon").on("click", function(event) {
        event.preventDefault();

        var cartoonchar = $("#cartoon-search").val().trim();

        if (cartoonchar === "") {
            renderButtons();
        }

        else if (cartoons.indexOf(cartoonchar) === -1) {
            cartoons.push(cartoonchar);
            renderButtons();
        }
        
        else {
            renderButtons();
        }
        console.log(cartoons);

    })



    // $(".cartoon").on("click", function() {
    //     console.log("click works");

    function getCartoonGif () {

        $("#gifs-here").empty();
        var character = $(this).attr("data-name");

        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=1a7853ed71024a36bbe58b12d18bf807&q=" 
                    + character + "&limit=10&lang=en";
        
            $.ajax({
                url: queryURL,
                method: 'GET'
            }).done(function(response) {
                console.log(response);
                console.log(cartoons);

                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

                        var gifDiv = $("<div>");

                        var rating = results[i].rating;

                        var p = $("<p>").text("Rating: " + rating);

                        var cartoonImage = $("<img>");

                        // var still = this.images.fixed_height_still.url;
                        // var animated = results.images.fixed_height.url;
                        
                        cartoonImage.attr("src", results[i].images.fixed_height_still.url)
                                    .attr("data-animate", results[i].images.fixed_height.url)
                                    .attr("data-still", results[i].images.fixed_height_still.url)
                                    .attr("data-state", "still")
                                    .addClass("thegif");
                        
                        gifDiv.append(p);
                        gifDiv.append(cartoonImage);
                        gifDiv.addClass("display");

                        $("#gifs-here").append(gifDiv);

                    }
                }

                $(".thegif").on("click", function() {
                            console.log("gif is clicked");
                            console.log(this);
                           
                          // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
                          var state = $(this).attr("data-state"); 

                          console.log(state);
                          
                          // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                          // Then, set the image's data-state to animate
                          // Else set src to the data-still value
                          if (state === "still") {
                            $(this).attr("src", $(this).attr("data-animate"));
                            $(this).attr("data-state", "animate");
                            // $(this).attr("data-state", "animate");
                          } else {
                            $(this).attr("src", $(this).attr("data-still"));
                            $(this).attr("data-state", "still");
                            // $(this).attr("data-state", "still");
                          }
                });


            });
    }

    $(document).on("click", ".cartoon", getCartoonGif);

    

});


