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
import { MovieListItem } from '../views/movies/listItem';

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
        MovieListItem,
        MyMoviesPage,
        MovieDetailsPage
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
        MovieListItem,
        MyMoviesPage,
        MovieDetailsPage
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
