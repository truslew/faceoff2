import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, NavigationEnd } from '@angular/router';
import * as moment from 'moment';
import { environment } from '../environments/environment';

declare let ga: Function;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public isNavbarCollapsed = true;
    public name: string = null;

    constructor(private router: Router, private af: AngularFireAuth) {
        this.router.events.subscribe(event => {
            if (environment.enableGoogleAnalytics && event instanceof NavigationEnd) {
                ga('set', 'page', event.urlAfterRedirects);
                ga('send', 'pageview');
            }

            this.isNavbarCollapsed = true;
        });

        this.af.authState.subscribe(auth => {
            if (auth) {
                this.name = auth.email;
            } else {
                this.name = null;
            }
        });

        moment.locale('nb', {
            months: 'januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
            weekdays: 'søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag'.split('_'),
            week: {
                dow: 1, // Monday is the first day of the week.
                doy: 4 // The week that contains Jan 4th is the first week of the year.
            }
        });
    }

    public logout(): void {
        this.af.auth.signOut();
    }
}
