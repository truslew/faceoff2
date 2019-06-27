import { Component, OnInit, Input } from '@angular/core';
import { MatchDaoEx } from 'src/app/shared/models/match';
import { MatchExtensions } from 'src/app/shared/extensions/match-extensions';

@Component({
    selector: 'app-admin-match-line',
    templateUrl: './admin-match-line.component.html',
    styleUrls: ['./admin-match-line.component.scss']
})
export class AdminMatchLineComponent implements OnInit {
    @Input() match: MatchDaoEx;

    constructor() {}

    ngOnInit() { }

    public get start(): string {
        if (this.match != null) {
            const m = MatchExtensions.toMoment(this.match);
            return m.format('YYYY-MM-DD hh:mm');
        }

        return '';
    }
}
