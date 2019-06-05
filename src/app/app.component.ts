import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavigationEnd, Router } from '@angular/router';
import * as moment from 'moment';
import { filter } from 'rxjs/operators';
import { environment } from '../environments/environment';

declare var gtag;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public isNavbarCollapsed = true;
    public name: string = null;

    constructor(private router: Router, private af: AngularFireAuth) {
        router.events
            .pipe(
                filter(() => environment.enableGoogleAnalytics),
                filter(e => e instanceof NavigationEnd)
            )
            .subscribe((e: NavigationEnd) => {
                gtag('config', 'UA-101849670-1', { page_path: e.urlAfterRedirects });
            });

        router.events.subscribe(() => (this.isNavbarCollapsed = true));

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
