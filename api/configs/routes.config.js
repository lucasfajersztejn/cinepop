const express = require("express");
const router = express.Router();
const movies = require("../controllers/movie.controller");
const cinemas = require("../controllers/cinema.controller");
const timesheets = require("../controllers/timesheet.controller");

// EndPoints for Movies
router.post("/movies/create", movies.create);
router.get("/movies", movies.list);
router.get("/movies/:id", movies.detail);
router.patch("/movies/:id", movies.update);
router.delete("/movies/:id", movies.delete);

// EndPoints for Cinemas
router.post("/cinemas/create", cinemas.create);
router.get("/cinemas", cinemas.list);
router.get("/cinemas/:id", cinemas.detail);
router.patch("/cinemas/:id", cinemas.update);
router.delete("/cinemas/:id", cinemas.delete);

// EndPoints for Timesheets
router.post("/timesheets/create", timesheets.create);
router.patch("/timesheets/:id", timesheets.update);
router.delete("/timesheets/:id", timesheets.delete);

module.exports = router;


/* 
Post (create) /timesheet/create
Patch (update) [FASE 2] /timesheet/id
Del (delete) [FASE 2] /timesheet/id
*/