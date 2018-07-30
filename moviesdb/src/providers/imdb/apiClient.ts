import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { zip } from 'rxjs/observable/zip';

import { Movie, MovieType } from './models/movie';
import { Cast } from './models/cast';

@Injectable()
class TMDBApiClient {

    private baseUrl: string = 'https://api.themoviedb.org';
    private apiVersion: string = '3';
    private apiKey: string = '7f8661a70a2785177ff438102e23a9aa';

    constructor(private http: HttpClient) {

    }

    /**
     * Fetch a list of movies by type (Popular / Upcoming / Top Rated).
     * @param type 
     */
    public fetchMovies(type: MovieType, page: number = 1) : Observable<Movie[]> {
        const path: string = MovieType.path(type);
        const observable = this.api<Movie[]>(path, 'get', { page: page });
        return observable.pipe(
            switchMap(data => of(data["results"])),
            map((data) => {
                return data.map((item) => Movie.fromJson(item))
            })
        );
    }

    /**
     * Fetch a list of popular movies.
     */
    public fetchPopularMovies(page: number = 1) : Observable<Movie[]> {
        return this.fetchMovies(MovieType.Popular, page);
    }

    /**
     * Fetch a list of upcoming movies.
     */
    public fetchUpcomingMovies(page: number = 1) : Observable<Movie[]> {
        return this.fetchMovies(MovieType.Upcoming, page);
    }

    /**
     * Fetch a list of the top rated movies.
     */
    public fetchTopRatedMovies(page: number = 1) : Observable<Movie[]> {
        return this.fetchMovies(MovieType.TopRated, page);
    }

    /**
     * Get the details of a movie: info, credits and similar movies
     * @param movieId 
     */
    public getMovieInfo(movieId: number) : Observable<Movie> {

        const observableMovieDetails = this.getMovieDetails(movieId);
        const observableMovieCredits = this.getMovieCredits(movieId);
        const observableSimilarMovies = this.getSimilarMovies(movieId);

        return zip(observableMovieDetails, observableMovieCredits, observableSimilarMovies)
            .pipe(
                map((results) => {
                    const movie: Movie = results[0];
                    movie.casting = results[1];
                    movie.similarMovies = results[2];
                    return movie;
                })  
            );
    }

    /**
     * Get the primary information about a movie.
     * @param movieId 
     */
    public getMovieDetails(movieId: number) : Observable<Movie> {
        const path: string = `movie/${movieId}`;
        const observable = this.api<Movie>(path, 'get');
        return observable.pipe(
                mergeMap(data => of(Movie.fromJson(data)))
            );
    }

    /**
     * Get the cast and crew for a movie.
     * @param movieId 
     */
    public getMovieCredits(movieId: number) : Observable<Cast[]> {
        const path: string = `movie/${movieId}/credits`;
        const observable = this.api<Movie>(path, 'get');
        return observable.pipe(
            mergeMap(data => of(data["cast"])),
            map((data) => {
                return data.map((item) => Cast.fromJson(item));
            })
        );
    }

    /**
     * Get a list of similar movies.
     * @param movieId 
     */
    public getSimilarMovies(movieId: number) : Observable<Movie[]> {
        const path: string = `movie/${movieId}/similar`;
        const observable = this.api<Movie[]>(path, 'get');
        return observable.pipe(
            switchMap(data => of(data["results"])),
            map((data) => {
                return data.map((item) => Movie.fromJson(item))
            })
        );
    }

    /**
     * Makes an http call to the endpoint.
     * @param path 
     * @param method 
     * @param params 
     */
    public api<T>(path: string, method: string = 'get', params: any = {}) : Observable<T> {
        if( method === 'get' ) {
            const endPoint = this.getEndpoint(path, params);
            console.log('[GET]:', endPoint);
            return this.http.get<T>(endPoint);
        }
        else if( method === 'post' ) {
            const endPoint = this.getEndpoint(path);
            console.log('[POST]:', endPoint, params);
            return this.http.post<T>(endPoint, params);
        }
    }

    /**
     * Builds the url for an API call.
     * @param path 
     * @param params 
     */
    private getEndpoint(path: string, params: any = {}) : string {
        let url: string = `${this.baseUrl}/${this.apiVersion}/${path}?api_key=${this.apiKey}`;
        if( params && Object.keys(params).length > 0 ) {
            const queryStringParams = this.getQueryStringParameters(params).join('&');
            url += '&' + queryStringParams;
        }
        return url;
    }

    private getQueryStringParameters(params: any = {}) : string[] {
        let keys: string[] = Object.keys(params);
        if( keys.length > 0 ) {
            let queryStringParams: string[] = keys.map((key: string) => {
                return `${key}=${params[key]}`;
            });
            return queryStringParams;
        }
        return [];
    }

}

export { TMDBApiClient };
