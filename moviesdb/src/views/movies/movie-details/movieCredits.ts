import { Component, Input } from '@angular/core';

import { Cast } from '../../../providers/imdb/imdb';

@Component({
    selector: 'movie-credits',
    templateUrl: 'movieCredits.html'
})
class MovieCredits {

    @Input()
    casting: Cast[] = [];

    @Input()
    numberOfSlides: number = 1;

    constructor() {

    }

}

export { MovieCredits };
