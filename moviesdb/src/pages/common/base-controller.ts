import { Component } from '@angular/core';
import { LoadingController, Loading  } from 'ionic-angular';

/**
 * Base Controller Component.
 */
class BaseController {

    /**
     * Loading View.
     */
    protected loadingView: Loading;

    constructor(public loadingCtrl: LoadingController) {

    }

    ngOnInit() {
        
    }

    protected showLoading() {
        this.loadingView = this.loadingCtrl.create({
            content: 'Loading...'
        });
        this.loadingView.present();
    }

    protected hideLoading() {
        this.loadingView.dismiss();
    }

}

export { BaseController };
