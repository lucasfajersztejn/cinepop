const mongoose = require("mongoose");
const Cinema = require("../models/cinema.model");

module.exports.create = (req, res, next) => {
  Cinema.create(req.body)
    .then((cinema) => res.status(201).json(cinema))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).json(err.errors);
      } else {
        next(err);
      }
    });
};

module.exports.list = (req, res, next) => {
  const { lat, lng } = req.query;
  const criterial = {};
  if (lat && lng) {
    criterial.location = {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [lng, lat],
        },
        $maxDistance: 15000,
        $minDistance: 0,
      },
    };
  }

  Cinema.find()
    .populate("timesheets")
    .then((cinemas) => res.json(cinemas))
    .catch((err) =>
      console.error("There was an error finding the cinemas", err)
    );
};

module.exports.detail = (req, res, next) => {
  Cinema.findById(req.params.id)
    .populate("timesheets")
    .then((cinema) => {
      if (cinema) {
        const cinemaJson = cinema.toJSON();
        cinemaJson.timesheets = cinema.timesheets;
        console.debug(cinemaJson);
        res.json(cinemaJson);
      } else {
        res.status(404).json({ message: "Cinema was not found" });
      }
    })
    .catch(next);
};

module.exports.update = (req, res, next) => {
  Cinema.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  })
    .then((cinema) => {
      if (cinema) {
        res.json(cinema);
      } else {
        res.status(404).json(err.errors);
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
  Cinema.findByIdAndDelete(req.params.id)
    .then((cinema) => {
      if (cinema) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "Cinema not found" });
      }
    })
    .catch((err) => console.error("No cinema has been found", err));
};
