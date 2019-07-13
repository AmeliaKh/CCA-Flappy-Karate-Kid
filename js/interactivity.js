jQuery("#scoresBtn").on("click", function() {
  jQuery("#content").empty()
  jQuery("#content").append(
    "<ul>" +
          "<li>" + "Me" + "</li>" +
          "<li>" + "Also me" + "</li>" +
          "<li>" + "Me again" + "</li>" +
    "</ul>")
});

jQuery("#creditsBtn").on("click", function() {
  jQuery("#content").empty()
  jQuery("#content").append("<div>" + "Game created by Bob!" + "</div>");
});

jQuery("#helpBtn").on("click", function() {
  jQuery("#content").empty();
  jQuery("#content").append(
    "<ul>" + "<li>" + "Press SPACE to flap your wings" + "</li>" + "<li>" + "Avoid the incoming pipes" + "</li>" + "</ul>");
});
