import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * My Movies Page (Favorites).
 */
@Component({
    selector: 'page-my-movies',
    templateUrl: 'my-movies.html',
})
export class MyMoviesPage {

    /**
     * Screen Title.
     */
    title: string = "My Movies";

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.title = navParams.get('title');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MyMoviesPage');
    }

}
