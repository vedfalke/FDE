const fs = require("fs");
const path = require("path");
const Movie = require("./model/Movie");
const MovieData = require("./model/MovieData");
const MovieMatch = require("./model/MovieMatch");

class MovieService {
    constructor(embeddingModel, jsonMapper) {
        this.embeddingModel = embeddingModel;
        this.jsonMapper = jsonMapper;
        this.moviesEmbedding = [];
    }

    initializeMovies() {
        const resource = path.join(
            __dirname,
            "../../springDemo/src/main/resources/movies.json"
        );

        const inputStream = fs.readFileSync(resource, "utf8");

        const movieDataList = this.jsonMapper.parse(inputStream).map(
            movieData => new MovieData(
                movieData.title,
                movieData.description
            )
        );

        for (const movieData of movieDataList) {
            const embedding = this.embeddingModel.embed(
                movieData.getDescription()
            );

            const movie = new Movie(
                movieData.getTitle(),
                movieData.getDescription(),
                embedding
            );

            this.moviesEmbedding.push(movie);
        }

        console.log(
            this.moviesEmbedding.length + " movies loaded with embeddings."
        );

        for (const movie of this.moviesEmbedding) {
            console.log(movie.getEmbedding());
        }
    }

    search(query) {
        const userQueryEmbedding = this.embeddingModel.embed(query);

        const matches = [];

        for (const movie of this.moviesEmbedding) {
            const similarity = this.cosineSimilarity(
                userQueryEmbedding,
                movie.getEmbedding()
            );

            const match = new MovieMatch(
                movie.getTitle(),
                movie.getDescription(),
                similarity
            );

            matches.push(match);
        }

        this.sortBySimilarity(matches);

        return this.topKMatches(matches, 3);
    }

    similarMovies(title) {
        const selectedMovie = this.findMovie(title);
        const matches = [];

        for (const movie of this.moviesEmbedding) {
            if (movie.getTitle().toLowerCase() === title.toLowerCase()) {
                continue;
            }

            const similarity = this.cosineSimilarity(
                selectedMovie.getEmbedding(),
                movie.getEmbedding()
            );

            const match = new MovieMatch(
                movie.getTitle(),
                movie.getDescription(),
                similarity
            );

            matches.push(match);
        }

        this.sortBySimilarity(matches);
        return this.topKMatches(matches, 3);
    }

    findMovie(title) {
        for (const movie of this.moviesEmbedding) {
            if (movie.getTitle().toLowerCase() === title.toLowerCase()) {
                return movie;
            }
        }

        throw new Error("Movie not found: " + title);
    }

    cosineSimilarity(a, b) {
        let dotProduct = 0.0;
        let normA = 0.0;
        let normB = 0.0;

        for (let i = 0; i < a.length; i++) {
            dotProduct += a[i] * b[i];
            normA += a[i] * a[i];
            normB += b[i] * b[i];
        }

        if (normA === 0 || normB === 0) {
            return 0.0;
        }

        return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
    }

    sortBySimilarity(matches) {
        matches.sort(
            (first, second) => second.getMatch() - first.getMatch()
        );
    }

    topKMatches(matches, limit) {
        const topMatches = [];

        const numberOfMatches = Math.min(limit, matches.length);

        for (let i = 0; i < numberOfMatches; i++) {
            topMatches.push(matches[i]);
        }

        return topMatches;
    }
}

module.exports = MovieService;
