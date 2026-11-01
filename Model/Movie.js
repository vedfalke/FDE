class Movie {
    constructor(title = null, description = null, embedding = null) {
        this.title = title;
        this.description = description;
        this.embedding = embedding;
    }

    getTitle() {
        return this.title;
    }

    setTitle(title) {
        this.title = title;
    }

    getDescription() {
        return this.description;
    }

    setDescription(description) {
        this.description = description;
    }

    getEmbedding() {
        return this.embedding;
    }

    setEmbedding(embedding) {
        this.embedding = embedding;
    }
}

module.exports = Movie;
