import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController  } from 'ionic-angular';

import { TMDBService, Movie } from '../../providers/imdb/imdb';
import { BaseController } from '../common/base-controller';

/**
 * Movie Details Page.
 */
@Component({
    selector: 'page-movie-details',
    templateUrl: 'movie-details.html',
})
class MovieDetailsPage extends BaseController {

    /**
     * Movie to display.
     */
    movie: Movie;

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        public loadingCtrl: LoadingController,
        private movieService: TMDBService) {
        
        super(loadingCtrl);
        this.movie = navParams.get('movie');

    }

    ngOnInit() {
        this.fetchMovieDetails();
    }

    private fetchMovieDetails() {
        this.showLoading();
        this.movieService.getMovieInfo(this.movie.id)
            .subscribe((movie: Movie) => {
                console.log(movie);
                this.movie = movie;
                this.hideLoading();
            }, (error) => {
                console.log('[ERROR] Error fetching movie info', error);
                this.hideLoading();
            });
    }

}

export { MovieDetailsPage };
