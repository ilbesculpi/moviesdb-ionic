import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Movie } from '../../../providers/imdb/imdb';

@Component({
    selector: 'similar-movies',
    templateUrl: 'similarMovies.html'
})
class SimilarMovies {

    @Input()
    movies: Movie[];

    @Input()
    numberOfSlides: number = 1;

    @Output()
    selectItem = new EventEmitter<Movie>();

    constructor() {

    }

    /**
     * Called when a movie is selected on the list.
     * @param movie 
     */
    onSelectItem(movie: Movie) {
        // signal parent component
        this.selectItem.emit(movie);
    }

}

export { SimilarMovies };
