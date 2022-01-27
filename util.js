const fs = require("fs");

const toTitleCase = (phrase) => {
    const words = phrase.split(" ");
    const cappedWords = words.map((word) => {
        let capNextLetter = true;
        let cappedWord = "";
        word.split("").forEach((letter) => {
            if (capNextLetter) {
                capNextLetter = false;
                cappedWord += letter.toUpperCase();
            } else {
                capNextLetter = letter === "-";
                cappedWord += letter.toLowerCase();
            }
        });
        return cappedWord;
    });

    return cappedWords.join(" ");
};

module.exports = {
    getGenres() {
        genres = [];
        movies.forEach((movie) => {
            const genre = toTitleCase(movie.genre);
            if (!genres.includes(genre)) {
                genres.push(genre);
            }
        });
    },
    getExtension(filename) {
        const nameParts = filename.split(".");
        return nameParts[nameParts.length - 1];
    },
    removeUploadedFile(path) {
        fs.unlink(`.${path}`, (err) => {});
    }
};
