const express = require("express");
const router = express.Router();
const { getGenres, getExtension, removeUploadedFile } = require("../util");

router.get("/", (req, res) => {
    res.render("index", { movies: movies });
});

router.get("/create", (req, res) => {
    res.render("addMovie");
});

router.post("/create", (req, res) => {
    const { title, description, genre } = req.body;
    if (!req.files) {
        return res.redirect("/movies");
    }
    const { poster } = req.files;
    const extension = getExtension(poster.name);
    const movieId = movies.length + 1;
    poster.mv(`${uploadPath}/${movieId}.${extension}`, (err) => {
        if (!err) {
            const newMovie = {
                poster: `/static/uploads/${movieId}.${extension}`,
                movieId,
                title,
                description,
                genre
            };
            movies.push(newMovie);
            getGenres();
        }
        res.redirect("/movies");
    });
});

router.post("/delete", (req, res) => {
    const movieId = parseInt(req.body.movieId);
    const movie = movies.find((movie) => movie.movieId === movieId);
    if (movie) {
        movies = movies.filter((movie) => movie.movieId !== movieId);
        removeUploadedFile(movie.poster);
        getGenres();
    }
    res.redirect("/movies");
});

router.get("/:movieId", (req, res) => {
    const movieId = parseInt(req.params.movieId);
    const movie = movies.find((movie) => movie.movieId === movieId);

    if (!movie || movie === "genre") {
        return res.redirect("/movies");
    }

    res.render("movieDetails", { movie: movie });
});

router.post("/genre", (req, res) => {
    const { genre } = req.body;
    if (genres.includes(genre)) {
        res.redirect(`/movies/genre/${genre}`);
    } else {
        res.redirect("/movies");
    }
});

router.get("/genre/:genre", (req, res) => {
    const { genre } = req.params;
    const moviesOfGenre = movies.filter(
        (movie) => movie.genre.toLowerCase() === genre.toLowerCase()
    );
    res.render("index", { movies: moviesOfGenre, genre: genre });
});

module.exports = router;
