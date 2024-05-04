const express = require("express");
const router = express.Router();
const movies = require("../controllers/movie.controller");
const cinemas = require("../controllers/cinema.controller");
const timesheets = require("../controllers/timesheet.controller");
const user = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");

// EndPoints for User
router.post("/admin/register", user.create);
router.post("/admin/login", user.login);
router.get("/admin/profile", auth.checkAuth, auth.checkRole("admin"), user.profile);
router.patch("/admin/profile/:id", auth.checkAuth, auth.checkRole("admin") , user.update);
router.delete("/admin/profile/:id", auth.checkAuth, auth.checkRole("admin"), user.delete);

// EndPoints for Movies
router.post("/movies", movies.create);
router.get("/movies", movies.list);
router.get("/movies/:id", movies.detail);
router.patch("/movies/:id", auth.checkAuth, auth.checkRole("admin"), movies.update);
router.delete("/movies/:id", auth.checkAuth, auth.checkRole("admin"), movies.delete);

// EndPoints for Cinemas
router.post("/cinemas", auth.checkAuth, auth.checkRole("admin"), cinemas.create);
router.get("/cinemas", cinemas.list);
router.get("/cinemas/:id", auth.checkAuth, auth.checkRole("admin"), cinemas.detail);
router.patch("/cinemas/:id", auth.checkAuth, auth.checkRole("admin"), cinemas.update);
router.delete("/cinemas/:id", auth.checkAuth, auth.checkRole("admin"), cinemas.delete);

// EndPoints for Timesheets
router.post("/timesheets", auth.checkAuth, auth.checkRole("admin"), timesheets.create);
router.patch("/timesheets/:id", auth.checkAuth, auth.checkRole("admin"), timesheets.update);
router.delete("/timesheets/:id", auth.checkAuth, auth.checkRole("admin"), timesheets.delete);

module.exports = router;
