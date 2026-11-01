class MovieMatch {
    constructor(title = null, description = null, match = 0.0) {
        this.title = title;
        this.description = description;
        this.match = match;
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

    getMatch() {
        return this.match;
    }

    setMatch(match) {
        this.match = match;
    }
}

module.exports = MovieMatch;
