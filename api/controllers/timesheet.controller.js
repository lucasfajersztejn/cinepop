const mongoose = require("mongoose");
const Timesheets = require("../models/timesheet.model");

module.exports.create = (req, res, next) => {
  Timesheets.create(req.body)
    .then((timeSheet) => res.status(201).json(timeSheet))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).json(err.errors);
      } else {
        next(err);
      }
    });
};

module.exports.update = (req, res, next) => {
  Timesheets.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  })
    .then((timeSheet) => {
      if (timeSheet) {
        res.json(timeSheet);
      } else {
        res.status(404).json({ message: "Timesheet not found" });
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
  Timesheets.findByIdAndDelete(req.params.id)
    .then((timeSheet) => {
      if (timeSheet) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "Timesheet not found" });
      }
    })
    .catch(next);
};
