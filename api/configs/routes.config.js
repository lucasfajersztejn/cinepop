const express = require("express");
const router = express.Router();

// EndPoints for Movies
router.get("/movies", (req, res, next) => res.send("Hola"));

// EndPoints for Cinemas

// EndPoints for Timesheets

module.exports = router;