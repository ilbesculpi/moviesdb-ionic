import { Component } from '@angular/core';
import { 
        NavController, NavParams, 
        LoadingController, Loading 
    } from 'ionic-angular';

import { TMDBService, Movie, MovieType } from '../../providers/imdb/imdb';

/**
 * Movie List Page.
 */
@Component({
    selector: 'page-movie-list',
    templateUrl: 'movie-list.html',
})
class MovieListPage {

    /**
     * Screen Title.
     */
    title: string = "Movies";

    /**
     * Type of Movies to display (Popular / Upcoming / Top Rated).
     */
    type: MovieType = MovieType.Popular;

    /**
     * Holds the list of movies to display.
     */
    movies: Movie[] = [];

    /**
     * Loading View.
     */
    private loadingView: Loading;

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        private loadingCtrl: LoadingController,
        private movieService: TMDBService) {

        this.title = navParams.get('title');
        this.type = navParams.get('type');
        
    }

    ngOnInit() {
        console.log('MovieList::ngOnInit()', this.type);
        this.fetchMovies();
    }

    private fetchMovies() {
        this.showLoading();
        this.movieService.fetchMovies(this.type)
            .subscribe((movies: Movie[]) => {
                console.log(movies);
                this.movies = movies;
                this.hideLoading();
            }, (error) => {
                console.log('[ERROR] Error fetching movies', error);
                this.hideLoading();
            });
    }

    showLoading() {
        this.loadingView = this.loadingCtrl.create({
            content: 'Loading...'
        });
        this.loadingView.present();
    }

    hideLoading() {
        this.loadingView.dismiss();
    }

}

export { MovieListPage };
