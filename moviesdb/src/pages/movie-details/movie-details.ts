import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController  } from 'ionic-angular';

import { BaseController } from '../common/base-controller';
import { TMDBService, Movie } from '../../providers/imdb/imdb';
import { SocialSharing } from '@ionic-native/social-sharing';
import { LocalManagerService } from '../../providers/local-manager/local-manager';

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
        public toastCtrl: ToastController,
        private movieService: TMDBService,
        private socialSharing: SocialSharing,
        private localService: LocalManagerService) {
        
        super(loadingCtrl);
        this.movie = navParams.get('movie');

    }

    ngOnInit() {
        this.localService.isMovieFavorited(this.movie.id)
            .then((result) => {
                this.favorited = result;
                console.log(result ? 'Movie is favorited' : 'Movie is not favorited');
            });
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
        this.localService.toggleMovie(this.movie)
            .then(() => {
                console.log('Complete');
                if( this.favorited ) {
                    this.displayFavoritedMessage();
                }
            })
    }

    private displayFavoritedMessage() {
        const toast = this.toastCtrl.create({
            message: 'Added to your favorite list!',
            duration: 2000,
            position: 'bottom'
        });
        toast.present();
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
