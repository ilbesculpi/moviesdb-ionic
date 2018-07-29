import { Component } from '@angular/core';

import { MovieListPage, MyMoviesPage } from '../pages';
import { MovieType } from '../../providers/imdb/imdb';

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {

    tabHome = {
        page: MovieListPage,
        title: 'Home',
        icon: 'home',
        params: {
            type: MovieType.Popular,
            title: 'Home'
        }
    }

    tabUpcoming = {
        page: MovieListPage,
        title: 'Upcoming',
        icon: 'clock',
        params: {
            type: MovieType.Upcoming,
            title: 'Next Releases'
        }
    }

    tabTopRated = {
        page: MovieListPage,
        title: 'Top Rated',
        icon: 'star',
        params: {
            type: MovieType.TopRated,
            title: 'Top Rated'
        }
    }

    tabFavorites = {
        page: MyMoviesPage,
        title: 'My Movies',
        icon: 'heart',
        params: {
            title: 'My Movies'
        }
    }

    constructor() {

    }
    
}
