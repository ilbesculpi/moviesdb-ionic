import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController  } from 'ionic-angular';

import { TMDBService, Movie } from '../../providers/imdb/imdb';
import { BaseController } from '../common/base-controller';

import { SocialSharing } from '@ionic-native/social-sharing';

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

    /**
     * Indicates whether the movie has been favorited by the user or not.
     */
    favorited: boolean = false;

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        public loadingCtrl: LoadingController,
        private movieService: TMDBService,
        private socialSharing: SocialSharing) {
        
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

    /**
     * Called when the user clicks the favorite button.
     */
    public toggleFavorite() {
        this.favorited = !this.favorited;
    }

    /**
     * Perform facebook share action.
     */
    public shareViaFacebook() {
        console.log('shareViaFacebook()');
        this.socialSharing.shareViaFacebook(
            this.movie.tagline,
            this.movie.posterUrl,
            null
        );
    }

    /**
     * Perform twitter share action.
     */
    public shareViaTwitter() {
        console.log('shareViaTwitter()');
        this.socialSharing.shareViaTwitter(
            this.movie.tagline,
            this.movie.posterUrl,
            this.movie.homepage
        );
    }

    /**
     * Perform instagram share action.
     */
    public shareViaInstagram() {
        console.log('shareViaInstagram()');
        this.socialSharing.shareViaInstagram(
            this.movie.tagline,
            this.movie.posterUrl
        );
    }

    /**
     * Perform whatsapp share action.
     */
    public shareViaWhatsApp() {
        console.log('shareViaWhatsApp()');
        this.socialSharing.shareViaWhatsApp(
            this.movie.tagline,
            this.movie.posterUrl,
            this.movie.homepage
        );
    }

    /**
     * Perform email share action.
     */
    public shareViaEmail() {
        console.log('shareViaEmail()');
        this.socialSharing.shareViaEmail(
            this.movie.tagline,
            this.movie.title,
            null
        );
    }

}

export { MovieDetailsPage };
