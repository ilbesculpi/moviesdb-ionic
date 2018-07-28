import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { Movie, MovieType } from './models/movie';

@Injectable()
class TMDBApiClient {

    private baseUrl: string = 'https://api.themoviedb.org';
    private apiVersion: string = '3';
    private apiKey: string = '7f8661a70a2785177ff438102e23a9aa';

    constructor(private http: HttpClient) {

    }

    /**
     * Fetch a list of popular movies.
     */
    public fetchPopularMovies() : Observable<Movie[]> {
        const observable = this.api<Movie[]>('movie/popular', 'get');
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
            return this.http.get<T>(endPoint);
        }
        else if( method === 'post' ) {
            const endPoint = this.getEndpoint(path);
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
        if( params ) {
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
