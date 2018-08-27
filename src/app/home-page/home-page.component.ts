import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
    items: Observable<any[]>;
    constructor(db: AngularFireDatabase) {
        this.items = db.list('teams').valueChanges();
    }

    ngOnInit() {}
}
