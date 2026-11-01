const MovieController = require("./MovieController");
const MovieService = require("./MovieService");

class DemoApplication {
    static main(embeddingModel) {
        const jsonMapper = JSON;
        const movieService = new MovieService(embeddingModel, jsonMapper);
        movieService.initializeMovies();
        return new MovieController(movieService);
    }
}

module.exports = DemoApplication;
