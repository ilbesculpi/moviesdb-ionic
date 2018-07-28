
enum MovieType {

    Popular = "popular",
    Upcoming = "upcoming",
    TopRated = "top_rated"

}

class Movie {

    id: number = 0;
    title: string = "";
    overview: string = "";
    popularity: number = 0;
    releaseDate: string = "";
    status: string = "";
    tagline: string = "";
    voteAverage: number = 0;
    voteCount: number = 0;
    posterPath: string = "";
    backdropPath: string = "";
    homepage: string = "";

    constructor() {

    }

    /**
     * Build a Movie object from the json entry returned by the TMDB Api.
     * @param json 
     */
    static fromJson(json: any) : Movie {
        const movie = new Movie();
        movie.id = json["id"];
        movie.title = json["title"];
        movie.overview = json["overview"];
        movie.popularity = json["popularity"];
        movie.posterPath = json["poster_path"];
        movie.backdropPath = json["backdrop_path"];
        movie.voteCount = json["vote_count"];
        movie.voteAverage = json["vote_average"];
        movie.releaseDate = json["release_date"];
        return movie;
    }

}

export { Movie, MovieType };
