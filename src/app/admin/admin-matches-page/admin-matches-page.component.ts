import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { MatchExtensions } from 'src/app/shared/extensions/match-extensions';
import { MatchDaoEx } from 'src/app/shared/models/match';
import { MatchesService } from 'src/app/shared/services/matches.service';
import { TakeUntilBase } from '../TakeUntilBase';

@Component({
    selector: 'app-admin-matches-page',
    templateUrl: './admin-matches-page.component.html',
    styleUrls: ['./admin-matches-page.component.scss']
})
export class AdminMatchesPageComponent extends TakeUntilBase implements OnInit {
    public matches: MatchDaoEx[] = [];

    constructor(public matchesService: MatchesService) {
        super();
    }

    ngOnInit() {
        this.matchesService
            .all()
            .pipe(takeUntil(this.destroy$))
            .subscribe(t => this.updateDate(t));
    }
    updateDate(teams: MatchDaoEx[]): void {
        this.matches = teams;
        this.matches.sort((a, b) => this.compare(a, b));
    }
    compare(a: MatchDaoEx, b: MatchDaoEx): number {
        const result = b.matchNo - a.matchNo;
        if (result != null) {
            return result;
        }

        const r = MatchExtensions.toMoment(a.start).isAfter(MatchExtensions.toMoment(b.start));
        return r ? 1 : -1;
    }
}
