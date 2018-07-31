import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';

// pages
import { 
        TabsPage, 
        HomePage, 
        MovieListPage,
        MyMoviesPage,
        MovieDetailsPage
    } from '../pages/pages';

// views
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MovieList, MovieListItem, 
        MovieCredits, SimilarMovies 
    } from '../views/movies/movies';
import { SocialShareButtons } from '../views/social-share/social-share';

// services
import { TMDBService } from '../providers/imdb/imdb';
import { SocialSharing } from '@ionic-native/social-sharing';
import { IonicStorageModule } from '@ionic/storage';
import { LocalManagerService } from '../providers/local-manager/local-manager';

@NgModule({
    declarations: [
        MyApp,
        TabsPage,
        HomePage,
        MovieListPage,
        MovieList,
        MovieListItem,
        MovieCredits,
        SimilarMovies,
        MyMoviesPage,
        MovieDetailsPage,
        SocialShareButtons
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        TabsPage,
        HomePage,
        MovieListPage,
        MovieList,
        MovieListItem,
        MovieCredits,
        SimilarMovies,
        MyMoviesPage,
        MovieDetailsPage,
        SocialShareButtons
    ],
    providers: [
        StatusBar,
        SplashScreen,
        TMDBService,
        SocialSharing,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        LocalManagerService
    ]
})
export class AppModule { }
