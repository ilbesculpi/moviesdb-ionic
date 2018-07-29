import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { BaseController } from '../common/base-controller';
import { TMDBService, Movie, MovieType } from '../../providers/imdb/imdb';
import { MovieDetailsPage } from '../pages';


/**
 * Movie List Page.
 */
@Component({
    selector: 'page-movie-list',
    templateUrl: 'movie-list.html',
})
class MovieListPage extends BaseController {

    /**
     * Screen Title.
     */
    title: string = "Movies";

    /**
     * Type of Movies to display (Popular / Upcoming / Top Rated).
     */
    type: MovieType = MovieType.Popular;

    /**
     * Tracks the current page to fetch.
     */
    page: number = 1;

    /**
     * Holds the list of movies to display.
     */
    movies: Movie[] = [];

    
    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        public loadingCtrl: LoadingController,
        private movieService: TMDBService) {

        super(loadingCtrl);
        this.title = navParams.get('title');
        this.type = navParams.get('type');
        
    }

    ngOnInit() {
        console.log('MovieList::ngOnInit()', this.type);
        this.fetchMovies();
    }

    private fetchMovies(completion?: (() => void )) {
        this.showLoading();
        this.movieService.fetchMovies(this.type, 1)
            .subscribe((movies: Movie[]) => {
                console.log(movies);
                this.page += 1;
                this.movies = movies;
                this.hideLoading();
                if( completion ) {
                    completion();
                }
            }, (error) => {
                console.log('[ERROR] Error fetching movies', error);
                this.hideLoading();
                if( completion ) {
                    completion();
                }
            });
    }

    /**
     * Called when the user pulls down at the top of the page.
     * @param refresher 
     */
    public refresh(refresher) {
        this.page = 1;  // reset page to 1
        this.fetchMovies(() => {
            refresher.complete();
        });
    }

    /**
     * Called when the user reaches the end of the list.
     * @param scroll 
     */
    public fetchMoreItems(scroll) {
        this.movieService.fetchMovies(this.type, this.page)
            .subscribe((movies: Movie[]) => {
                console.log(movies);
                this.page += 1;
                // append the movies at the end of the array
                movies.forEach((movie) => this.movies.push(movie));
                scroll.complete();
            }, (error) => {
                console.log('[ERROR] Error fetching movies', error);
                scroll.complete();
            });
    }

    /**
     * Called when a movie is selected on the list.
     * @param movie 
     */
    onSelectMovie(movie: Movie) {
        this.navCtrl.push(MovieDetailsPage, {
            movie: movie
        });
    }

}

export { MovieListPage };
