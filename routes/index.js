const express = require("express");
const moviesRouter = require("./movies");
const apiRouter = require("./api");

const router = express.Router();

router.use("/static", express.static("static"));
router.use("/movies", moviesRouter);
router.use("/api/movies", apiRouter);

module.exports = router;
