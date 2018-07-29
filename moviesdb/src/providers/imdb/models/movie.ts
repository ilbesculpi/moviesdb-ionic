import { Cast } from './cast';
import * as moment from 'moment';

const imageUrlPrefix: string = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';

class Movie {

    id: number = 0;
    title: string = "";
    overview: string = "";
    popularity: number = 0;
    releaseDate: moment.Moment;
    status: string = "";
    tagline: string = "";
    voteAverage: number = 0;
    voteCount: number = 0;
    posterPath: string = "";
    backdropPath: string = "";
    homepage: string = "";

    casting: Cast[] = [];

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

    get releaseDateText() : string {
        return this.releaseDate.format('MMM d, YYYY');
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
        movie.releaseDate = moment(json["release_date"], 'YYYY-MM-DD');
        movie.homepage = json["homepage"];
        movie.tagline = json["tagline"];
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
