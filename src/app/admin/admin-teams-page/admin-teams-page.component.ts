import { Component, OnInit } from '@angular/core';
import { TeamDaoEx } from 'src/app/shared/models/team';
import { TeamsService } from 'src/app/shared/services/teams.service';

@Component({
    selector: 'app-admin-teams-page',
    templateUrl: './admin-teams-page.component.html',
    styleUrls: ['./admin-teams-page.component.scss']
})
export class AdminTeamsPageComponent implements OnInit {
    public teams: TeamDaoEx[] = [];

    constructor(public teamsService: TeamsService) {}

    ngOnInit() {
        this.teamsService.all().subscribe(t => this.updateDate(t));
    }
    updateDate(teams: TeamDaoEx[]): void {
        this.teams = teams;
    }
}
