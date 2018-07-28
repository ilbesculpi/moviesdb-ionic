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
    } from '../pages/pages';

// views
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MovieListItem } from '../views/movies/listItem';

// services
import { TMDBService } from '../providers/imdb/imdb';

@NgModule({
    declarations: [
        MyApp,
        TabsPage,
        HomePage,
        MovieListPage,
        MovieListItem,
        MyMoviesPage
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        TabsPage,
        HomePage,
        MovieListPage,
        MovieListItem,
        MyMoviesPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        TMDBService,
        { provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
})
export class AppModule { }
