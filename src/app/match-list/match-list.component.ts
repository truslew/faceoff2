import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Match } from '../shared/models/match';
import { FaceoffDataService } from '../shared/services/faceoff-data.service';
import { DayMatch } from './DayMatch';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
    selector: 'app-match-list',
    templateUrl: './match-list.component.html'
})
export class MatchListComponent implements OnInit {
    @Input() matches: Match[];

    @Input() showAgeClass = true;

    @Input() showGroup = true;

    @Input() showDate = true;

    @Input() simple = false;

    public isAutenticated = false;

    public isHenning = false;

    constructor(private dataService: FaceoffDataService, private router: Router) {
        dataService.authenticated.subscribe(auth => (this.isAutenticated = auth));
        dataService.isHenning.subscribe(auth => (this.isHenning = auth));
    }

    ngOnInit() {}

    public get dayMatches(): DayMatch[] {
        const days = this.matches.map(m => m.start.clone().startOf('day'));
        const uniqDays = _.uniqBy(days, (d: moment.Moment) => d.toDate().getDate());
        const dayMatches = uniqDays.map(d => new DayMatch(d));

        dayMatches.forEach(dm => (dm.matches = this.matches.filter(m => m.start.isSame(dm.day, 'day'))));

        return dayMatches;
    }

    public trackByFn(index: number, item: Match) {
        return item.id; // or item.id
    }

    public playMatch(match: Match): void {
        if (this.isAutenticated && match != null) {
            this.router.navigate(['/match-play', { match: match.id }]);
        }
    }
}
