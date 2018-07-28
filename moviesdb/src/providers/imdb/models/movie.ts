
const imageUrlPrefix: string = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';

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

    get posterUrl() : string {
        return `${imageUrlPrefix}${this.posterPath}`;
    }

    get backdropUrl() : string {
        return `${imageUrlPrefix}${this.backdropPath}`;
    }

    get rating() : number {
        return this.voteAverage * 10.0;
    }

}

namespace Movie {

    /**
     * Build a Movie object from the json entry returned by the TMDB Api.
     * @param json 
     */
    export function fromJson(json: any) : Movie {
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

enum MovieType {

    Popular = "popular",
    Upcoming = "upcoming",
    TopRated = "top_rated"

}

namespace MovieType {

    /**
     * Helper function to get the API path for fetching movies.
     * @param type 
     */
    export function path(type: MovieType) : string {
        switch( type ) {
            case MovieType.Popular:
                return 'movie/popular';
            case MovieType.Upcoming:
                return 'movie/upcoming';
            case MovieType.TopRated:
                return 'movie/top_rated';
        }
    }

}

export { Movie, MovieType };
