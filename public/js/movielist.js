$(document).ready(function() {
  $(".dropdown-trigger").dropdown({
    coverTrigger: false
  });
});
$(() => {
  $(".change-isWatched").on("click", function() {
    const id = $(this).data("id");
    const newisWatched = $(this).data("newisWatched");

    const newisWatchedState = { value: newisWatched };

    $.ajax(`/api/watchlistitem/${id}/is_watched`, {
      type: "PUT",

      data: JSON.stringify(newisWatchedState),

      contentType: "application/json; charset=UTF-8"
    }).then(() => {
      location.reload();
    });
  });
});
