class MovieController {
    constructor(movieService) {
        this.movieService = movieService;
    }

    search(query) {
        return this.movieService.search(query);
    }

    similarMovies(title) {
        return this.movieService.similarMovies(title);
    }
}

module.exports = MovieController;
