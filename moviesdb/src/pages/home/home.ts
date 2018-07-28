import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TMDBService, Movie } from '../../providers/imdb/imdb';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    movies: Movie[] = [];

    constructor(public navCtrl: NavController, private movieService: TMDBService) {

    }

    ngOnInit() {
        console.log('Home::ngOnInit()');
        this.movieService.fetchPopularMovies()
            .subscribe((movies: Movie[]) => {
                console.log(movies);
            }, (error) => {
                console.log('[ERROR] Error fetching movies', error);
            });
    }

}
