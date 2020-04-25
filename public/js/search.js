// import { response } from "express";

$(document).ready(function() {
  $(".dropdown-trigger").dropdown({
    coverTrigger: false
  });
});
$(document).ready(function() {
  let movies = [];
  function displayMovieInfo() {
    const movie = $(this).attr("data-name");
    const queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=87765921";
    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      // Creating a div to hold the movie
      const movieDiv = $("<div class='movie' class='row'>");
      // Retrieving the URL for the image
      const imgURL = response.Poster;
      // Creating an element to hold the image
      const image = $("<img>").attr("src", imgURL);
      image.attr("height", "15%");
      image.attr("width", "15%");
      image.addClass("col s3");
      // Appending the image
      movieDiv.append(image);
      const title = response.Title;
      const movieHeader = $("<h4>").text(title);
      movieHeader.addClass("col s5");
      movieDiv.append(movieHeader);
      const watchListButton = $("<button>").text("Add to Watch List");
      watchListButton.addClass("waves-effect waves-light btn unwatched");
      movieDiv.append(watchListButton);
      const watchedButton = $("<button>").text("Already Watched");
      watchedButton.addClass("waves-effect waves-light btn watched");
      movieDiv.append(watchedButton);
      // Putting the entire movie above the previous movies
      $(document).on("click", ".unwatched", () => {
        if ($(this).attr("disabled")) {
          return;
        }
        alert("hi");
        const unwatchedMovie = {
          title: response.Title,
          is_watched: false,
          api_id: response.imdbID
        };

        $.ajax("/api/watchlistitem", {
          type: "POST",
          data: unwatchedMovie
        }).then(() => {
          alert("Disabling");
          $(this).attr("disabled", true);
          console.log(this);
        });
      });

      $(document).on("click", ".watched", () => {
        event.preventDefault();

        const watchedMovie = {
          title: response.Title,
          is_watched: true,
          api_id: response.imdbID
        };

        $.ajax("/api/watchlistitem", {
          type: "POST",
          data: watchedMovie
        }).then(() => {
          alert("Disabling");
          $(this).attr("disabled", true);
          console.log(this);
        });
      });
      $("#search-results").prepend(movieDiv);
    });
  }

  // This function handles events where a movie button is clicked
  $("#add-movie").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    const movie = $("#movie-input")
      .val()
      .trim();
    // Adding movie from the textbox to our array
    movies.push(movie);
    for (var i = 0; i < movies.length; i++) {
      // Adding a class of movie-btn to our button
      $("#add-movie").addClass("movie-btn");
      // Adding a data-attribute
      $("#add-movie").attr("data-name", movies[i]);
      // Providing the initial button text
      $("#add-movie").text(movies[i]);
    }
  });
  $(document).on("click", ".movie-btn", displayMovieInfo);
});
