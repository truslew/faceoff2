import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { TeamDaoEx } from 'src/app/shared/models/team';
import { TeamsService } from 'src/app/shared/services/teams.service';

@Component({
    selector: 'app-admin-team-edit',
    templateUrl: './admin-team-edit.component.html',
    styleUrls: ['./admin-team-edit.component.scss']
})
export class AdminTeamEditComponent implements OnInit, OnDestroy {
    public team: TeamDaoEx;

    private destroy$ = new Subject<boolean>();

    constructor(private teamService: TeamsService, private route: ActivatedRoute, private router: Router) {}

    ngOnInit() {
        this.route.paramMap
            .pipe(
                map(p => p.get('id')),
                tap(p => console.log('Id: ' + p)),
                switchMap(id => this.teamService.get(id)),
                takeUntil(this.destroy$)
            )
            .subscribe(s => this.setData(s));
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    private setData(team: TeamDaoEx): void {
        this.team = team;
    }
}
