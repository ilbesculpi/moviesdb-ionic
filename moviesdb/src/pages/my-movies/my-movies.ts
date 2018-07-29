import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { BaseController } from '../common/base-controller';
import { LocalManagerService } from '../../providers/local-manager/local-manager';
import { Movie } from '../../providers/imdb/imdb';
import { MovieDetailsPage } from '../pages';

/**
 * My Movies Page (Favorites).
 */
@Component({
    selector: 'page-my-movies',
    templateUrl: 'my-movies.html',
})
class MyMoviesPage extends BaseController {

    /**
     * Screen Title.
     */
    title: string = "My Movies";

    /**
     * Holds the list of movies to display.
     */
    movies: Movie[] = [];

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        public loadingCtrl: LoadingController,
        private localService: LocalManagerService) {

        super(loadingCtrl);
        this.title = navParams.get('title');

    }

    ngOnInit() {
        console.log('MyMovies::ngOnInit()');
    }

    ionViewWillEnter() {
        console.log('MyMovies::ionViewWillEnter()');
        this.fetchMovies();
    }

    private fetchMovies(completion?: (() => void )) {
        this.showLoading();
        this.localService.getFavoriteMovies()
            .then((movies) => {
                console.log(movies);
                this.movies = movies;
                this.hideLoading();
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

export { MyMoviesPage };
