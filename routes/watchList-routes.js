const db = require("../models");

module.exports = app => {
  app.post("/api/users", (req, res) => {
    db.User.create(req.body).then(dbUser => {
      res.json(dbUser);
    });
  });

  app.get("/search", (req, res) => {
    if (!req.user) {
      // The user is not logged in, redirect to signup
      res.redirect("/signup");
    } else {
      res.sendFile(path.join(__dirname, "../public/placeholder.html"));
    }
  });

  app.get("/movielist", (req, res) => {
    if (!req.user) {
      // The user is not logged in, redirect to signup
      res.redirect("/signup");
    } else {
      res.sendFile(path.join(__dirname, "../public/placeholder.html"));
    }
  });

  app.post("/api/watchlistitem", (req, res) => {
    // req.body: title, api_id, is_watched
    db.WatchListItem.create({
      UserId: 1, // todo: req.user here
      title: req.body.title,
      api_id: req.body.api_id,
      is_watched: req.body.is_watched
    }).then(dbWatch => {
      res.json(dbWatch);
    });
  });
};
