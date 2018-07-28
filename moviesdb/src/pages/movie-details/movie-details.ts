import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Movie } from '../../providers/imdb/imdb';

/**
 * Movie Details Page.
 */
@Component({
    selector: 'page-movie-details',
    templateUrl: 'movie-details.html',
})
class MovieDetailsPage {

    /**
     * Movie to display.
     */
    movie: Movie;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.movie = navParams.get('movie');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MovieDetailsPage');
    }

}

export { MovieDetailsPage };
