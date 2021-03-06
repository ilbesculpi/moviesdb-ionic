import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Movie } from '../imdb/imdb';

/***
 * Local Manager Service.
 */
@Injectable()
class LocalManagerService {

    private moviesKey: string = "favoriteMovies";

    constructor(public storage: Storage) {
        
    }

    public toggleMovie(movie: Movie) : Promise<void> {
        return this.isMovieFavorited(movie.id)
            .then((result) => {
                if( !result ) {
                    return this.storeMovie(movie);
                }
                else {
                    return this.removeMovie(movie);
                }
            })
    }

    public storeMovie(movie: Movie) : Promise<void> {
        return this.getFavoriteMovies()
            .then((movies) => {
                movies.push(movie);
                return this.storeMovies(movies);
            });
    }

    public storeMovies(movies: Movie[]) : Promise<void> {
        const value = JSON.stringify(movies.map((movie) => Movie.toJson(movie)));
        this.storage.set(this.moviesKey, value);
        return Promise.resolve();
    }

    public removeMovie(movie: Movie) {
        this.getFavoriteMovies()
            .then((movies) => {
                const key: string = String(movie.id);
                const movieIds: Array<String> = movies.map((movie) => String(movie.id));
                const index = movieIds.indexOf(key);
                if( index !== -1 ) {
                    movies.splice(index, 1);
                    return this.storeMovies(movies);
                }
                return this.storeMovies(movies);
            });
    }

    public getFavoriteMovies() : Promise<Movie[]> {
        return this.storage.get(this.moviesKey)
            .then((value) => {
                if( value ) {
                    const obj = JSON.parse(value);
                    return obj.map((item) => {
                        const movie = Movie.fromJson(item);
                        return movie;
                    });
                }
                else {
                    return [];
                }
            });
    }

    public getMovie(movieId: number) : Promise<Movie> {
        return this.getFavoriteMovies()
            .then((movies) => {
                return movies.find((movie) => movie.id === movieId);
            });
    }

    public isMovieFavorited(movieId: number) : Promise<boolean> {
        const key: string = String(movieId);
        return this.getFavoriteMovies()
            .then((movies) => {
                const movieIds: Array<String> = movies.map((movie) => String(movie.id));
                return movieIds.indexOf(key) !== -1;
            });
    }

    public removeAllMovies() : Promise<void> {
        return this.storeMovies([]);
    }

}

export { LocalManagerService };
