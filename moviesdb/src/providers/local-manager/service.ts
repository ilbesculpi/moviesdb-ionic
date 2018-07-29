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
        const value = JSON.stringify(movies);
        this.storage.set(this.moviesKey, value);
        return Promise.resolve();
    }

    public removeMovie(movie: Movie) {
        this.getFavoriteMovies()
            .then((movies) => {
                const index = movies.indexOf(movie);
                if( index !== -1 ) {
                    const newMovies = movies.splice(index, 1);
                    return this.storeMovies(newMovies);
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
                        return item as Movie;
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

}

export { LocalManagerService };
