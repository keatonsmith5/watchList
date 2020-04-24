const db = require("../models");

module.exports = app => {
  app.post("/api/users", (req, res) => {
    db.User.create(req.body).then(dbUser => {
      res.json(dbUser);
    });
  });

  app.post("/api/watchlistitem", (req, res) => {
    // {
    //     "title": "the matrix",
    //     "api_id": "1",
    //      Is_watched should be true for the "watched list"
    //     "is_watched": false
    //  }
    db.WatchListItem.create({
      UserId: req.body.user, // todo: req.user here
      title: req.body.title,
      api_id: req.body.api_id,
      is_watched: req.body.is_watched
    }).then(dbWatch => {
      res.json(dbWatch);
    });
  });

  app.get("/api/watchlistitem", (req, res) => {
    if (!req.user) {
      // The user is not logged in, redirect to signup
      res.sendStatus(403);
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.WatchListItem.findAll({
      where: {
        UserId: req.user.id
      }
    }).then(dbWatch => {
      res.json(dbWatch);
    });
  });

  app.patch("/api/watchlistitem/:id", (req, res) => {
    // req.body: title, api_id, is_watched
    db.WatchListItem.update(
      { is_watched: true },
      {
        where: {
          api_id: req.params.id
        }
      }
    ).then(dbWatch => {
      res.json(dbWatch);
    });
  });
};
