import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { TeamDaoEx } from 'src/app/shared/models/team';
import { TeamsService } from 'src/app/shared/services/teams.service';
import { TakeUntilBase } from '../TakeUntilBase';

@Component({
    selector: 'app-admin-teams-page',
    templateUrl: './admin-teams-page.component.html',
    styleUrls: ['./admin-teams-page.component.scss']
})
export class AdminTeamsPageComponent extends TakeUntilBase implements OnInit {
    public teams: TeamDaoEx[] = [];

    constructor(public teamsService: TeamsService) {
        super();
    }

    ngOnInit() {
        this.teamsService
            .all()
            .pipe(takeUntil(this.destroy$))
            .subscribe(t => this.updateDate(t));
    }
    updateDate(teams: TeamDaoEx[]): void {
        this.teams = teams;
    }
}
