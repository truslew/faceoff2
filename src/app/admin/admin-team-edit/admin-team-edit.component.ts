import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { TeamDaoEx } from 'src/app/shared/models/team';
import { TeamsService } from 'src/app/shared/services/teams.service';
import { TakeUntilBase } from '../TakeUntilBase';

@Component({
    selector: 'app-admin-team-edit',
    templateUrl: './admin-team-edit.component.html',
    styleUrls: ['./admin-team-edit.component.scss']
})
export class AdminTeamEditComponent extends TakeUntilBase implements OnInit {
    public team: TeamDaoEx;


    constructor(private teamService: TeamsService, private route: ActivatedRoute, private router: Router) {
        super();
    }

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

    private setData(team: TeamDaoEx): void {
        this.team = team;
    }
}
