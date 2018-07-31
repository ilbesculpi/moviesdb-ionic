import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Movie } from '../../../providers/imdb/imdb';


/**
 * Movie List Component.
 */
@Component({
    selector: 'movie-list',
    templateUrl: 'movieList.html',
})
class MovieList {

    /**
     * Holds the list of movies to display.
     */
    @Input()
    movies: Movie[] = [];

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

export { MovieList };
