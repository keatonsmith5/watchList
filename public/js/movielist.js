$(document).ready(function() {
  $(".dropdown-trigger").dropdown({
    coverTrigger: false
  });
});
$(() => {
  $(".change-isWatched").on("click", function() {
    alert("click works");
    const id = $(this).data("id");
    const newisWatched = $(this).data("newisWatched");

    const newisWatchedState = { value: newisWatched, api_id: id };

    $.ajax("/api/watchlistitem/", {
      type: "PUT",

      data: JSON.stringify(newisWatchedState),

      contentType: "application/json; charset=UTF-8"
    }).then(() => {
      location.reload();
    });
  });
});
