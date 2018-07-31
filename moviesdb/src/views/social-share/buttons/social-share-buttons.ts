import { Component, Input } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
    selector: 'social-share-buttons',
    templateUrl: 'social-share-buttons.html'
})
class SocialShareButtons {

    @Input()
    message: string = null;

    @Input()
    subject: string = null;

    @Input()
    image: string = null;

    @Input()
    url: string = null;

    @Input()
    color: string = "primary";

    constructor(private socialSharing: SocialSharing) {

    }

    /**
     * Perform facebook share action.
     */
    public shareViaFacebook() {
        console.log('shareViaFacebook()');
        this.socialSharing.shareViaFacebook(
            this.url,
            null,
            this.url
        );
    }

    /**
     * Perform twitter share action.
     */
    public shareViaTwitter() {
        console.log('shareViaTwitter()');
        this.socialSharing.shareViaTwitter(
            this.message,
            this.image,
            this.url
        );
    }

    /**
     * Perform instagram share action.
     */
    public shareViaInstagram() {
        console.log('shareViaInstagram()');
        this.socialSharing.shareViaInstagram(
            this.message,
            this.image
        );
    }

    /**
     * Perform whatsapp share action.
     */
    public shareViaWhatsApp() {
        console.log('shareViaWhatsApp()');
        this.socialSharing.shareViaWhatsApp(
            this.message,
            this.image,
            this.url
        );
    }

    /**
     * Perform email share action.
     */
    public shareViaEmail() {
        console.log('shareViaEmail()');
        this.socialSharing.shareViaEmail(
            this.message,
            this.subject,
            null,   // to
            null,   // cc
            null,   // bcc
            [this.image]
        );
    }

}

export { SocialShareButtons };
