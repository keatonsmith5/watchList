// Requiring path to so we can use relative routes to our HTML files
const db = require("../models");
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("signup", { style: "stylesheets/style.css" });
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("login", { style: "stylesheets/style.css" });
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.render("members", { style: "stylesheets/members.css" });
  });

  //route to handle switching from search movies to my movielist.
  app.get("/movielist", isAuthenticated, (req, res) => {
    db.WatchListItem.findAll({
      where: {
        UserId: req.user.id
      }
    }).then(dbWatch => {
      const userMovieList = dbWatch.map(list => {
        return {
          id: list.dataValues.id,
          movietitle: list.dataValues.title,
          is_watched: list.dataValues.is_watched,
          UserId: list.dataValues.UserId,
          api_id: list.dataValues.api_id
        };
      });

      res.render("index", {
        userMovieList,
        style: "stylesheets/movielist.css"
      });
    });
  });

  //route to search from my movies
  app.get("/search", isAuthenticated, (req, res) => {
    // res.sendFile(path.join(__dirname, "../public/search.html"));
    res.render("search", { style: "stylesheets/search.css" });
  });
};
