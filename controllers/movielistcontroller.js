var express = require("express");

var router = express.Router();
var watchList = require("../models/watchlist.js");

router.get("/", function(req, res) {
    res.redirect("/watchlist");
  });

  router.get("/watchlist", function(req, res) {
    // express callback response by calling see all watchlist
    watchList.all(function(watchlistData) {
      // wrapper for orm.js that using MySQL query callback will return watchlist data, render to index with handlebar
      //need watchlist or index handlebar ??
      res.render("placeholderwatchlisthtml example index", { watchlist_data: watchlistData });
    });
  });

  // post route -> back to index
router.post("/watchlist/create", function(req, res) {
    // takes the request object using it as input for watchlist.addmovie
    movie.create(req.body.movie_name, function(result) {
      // wrapper for orm.js that using MySQL insert callback will return a log to console,
      // render back to index with handle
      console.log(result);
      res.redirect("/");
    });
  });

  // put route -> back to index
router.put("/movie/:id", function(req, res) {
    movie.update(req.params.id, function(result) {
      // wrapper for orm.js that using MySQL update callback will return a log to console,
      // render back to index with handle
      console.log(result);
      // Send back response and let page reload from .then in Ajax
      res.sendStatus(200);
    });
  });
  
  module.exports = router;
  