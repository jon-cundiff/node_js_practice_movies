const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({ movies: movies });
});

module.exports = router;
