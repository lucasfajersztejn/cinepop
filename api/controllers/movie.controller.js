const mongoose = require("mongoose");
const Movie = require("../models/movie.model");

module.exports.create = (req, res, next) => {
  Movie.create(req.body)
    .then((movie) => res.status(201).json(movie))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).json(err.errors);
      } else {
        next(err);
      }
    });
};

module.exports.list = (req, res, next) => {
  Movie.find()
    .populate("timesheets")
    .then((movies) => res.json(movies))
    .catch((err) =>
      console.error("There was an error finding the movies", err)
    );
};

module.exports.detail = (req, res, next) => {
  Movie.findById(req.params.id)
    .populate("timesheets")
    .then((movie) => {
      if (movie) {
        res.json(movie);
      } else {
        res.status(404).json({ message: "Movie not found" });
      }
    })
    .catch(next);
};

module.exports.update = (req, res, next) => {
  Movie.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  })
    .then((movie) => {
      if (movie) {
        res.json(movie);
      } else {
        res.status(404).json({ message: "Movie not found" });
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).json(err.errors);
      } else {
        next(err);
      }
    });
};

module.exports.delete = (req, res, next) => {
  Movie.findByIdAndDelete(req.params.id)
    .then((movie) => {
      if (movie) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "Movie not found" });
      }
    })
    .catch(next);
};
