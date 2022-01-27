const express = require("express");
const mustacheExpress = require("mustache-express");
const fileUpload = require("express-fileupload");
const router = require("./routes/index");

const app = express();

global.movies = [];

global.genres = [];
global.uploadPath = `${__dirname}/static/uploads`;
app.locals.genres = () => genres;

app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.use(router);

app.get("/", (req, res) => res.redirect("/movies"));

app.listen(3000, () => console.log("Movies server running on port 3000"));
