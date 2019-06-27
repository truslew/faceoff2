import { Component, OnInit } from '@angular/core';
import { MatchDaoEx } from 'src/app/shared/models/match';
import { TakeUntilBase } from '../TakeUntilBase';
import { MatchesService } from 'src/app/shared/services/matches.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap, switchMap, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-admin-match-edit',
    templateUrl: './admin-match-edit.component.html',
    styleUrls: ['./admin-match-edit.component.scss']
})
export class AdminMatchEditComponent extends TakeUntilBase implements OnInit {
    public match: MatchDaoEx;

    constructor(private matchesService: MatchesService, private route: ActivatedRoute, private router: Router) {
        super();
    }

    ngOnInit() {
        this.route.paramMap
            .pipe(
                map(p => p.get('id')),
                tap(p => console.log('Id: ' + p)),
                switchMap(id => this.matchesService.get(id)),
                takeUntil(this.destroy$)
            )
            .subscribe(s => this.setData(s));
    }

    private setData(match: MatchDaoEx): void {
        this.match = match;
    }
}
