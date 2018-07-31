import { Component, Input } from '@angular/core';

import { Movie } from '../../../providers/imdb/imdb';

@Component({
    selector: 'movie-list-item',
    templateUrl: 'listItem.html'
})
class MovieListItem {

    @Input()
    movie: Movie;

    constructor() {

    }

}

export { MovieListItem };
