class MovieData {
    constructor(title = null, description = null) {
        this.title = title;
        this.description = description;
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
}

module.exports = MovieData;
