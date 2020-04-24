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
    // {
    //     "title": "the matrix",
    //     "api_id": "1",
    //      Is_watched should be true for the "watched list"
    //     "is_watched": false
    //  }
    db.WatchListItem.create({
      UserId: req.UserId, // todo: req.user here
      title: req.body.title,
      api_id: req.body.api_id,
      is_watched: req.body.is_watched
    }).then(dbWatch => {
      res.json(dbWatch);
    });
  });

  app.patch("/api/watchlistitem/:id", (req, res) => {
    // req.body: title, api_id, is_watched
    db.WatchListItem.update(req.body.is_watched, {
      where: {
        id: req.param.id
      }
    }).then(dbWatch => {
      res.json(dbWatch);
    });
  });
};
