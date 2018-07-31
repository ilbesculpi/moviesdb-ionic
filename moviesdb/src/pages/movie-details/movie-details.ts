import { Component } from '@angular/core';
import { NavController, NavParams,
    LoadingController, ToastController,
    Platform  } from 'ionic-angular';

import { BaseController } from '../common/base-controller';
import { TMDBService, Movie } from '../../providers/imdb/imdb';
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

    numberOfSlides = 2;

    share: {
        message: string,
        subject: string,
        image: string,
        url: string
    }

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController,
        public platform: Platform,
        private movieService: TMDBService,
        private localService: LocalManagerService) {
        
        super(loadingCtrl);
        this.movie = navParams.get('movie');

        // define share properties
        this.share = {
            message: "I'm sharing this movie with you. Enjoy!",
            subject: "I'm sharing this movie with you. Enjoy!",
            image: this.movie.posterUrl,
            url: this.movie.homepage
        };

    }

    ngOnInit() {
        this.localService.isMovieFavorited(this.movie.id)
            .then((result) => {
                this.favorited = result;
                console.log(result ? 'Movie is favorited' : 'Movie is not favorited');
            });
        this.fetchMovieDetails();
        this.numberOfSlides = this.platform.width() > 500 ? 4 : 2;
    }

    private fetchMovieDetails() {
        this.showLoading();
        this.movieService.getMovieInfo(this.movie.id)
            .subscribe((movie: Movie) => {
                console.log(movie);
                this.movie = movie;
                this.share.url = movie.homepage;
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
     * Called when a similar movie is selected from the list.
     * @param movie 
     */
    public onSelectMovie(movie: Movie) {
        this.navCtrl.push(MovieDetailsPage, {
            movie: movie
        });
    }

}

export { MovieDetailsPage };
