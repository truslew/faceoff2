import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Team } from '../../shared/models/team';
import { FaceoffDataService } from '../../shared/services/faceoff-data.service';
import { TeamsDataContext } from '../../shared/models/teamsDataContext';

@Component({
    selector: 'app-team-details',
    templateUrl: './team-details.component.html'
})
export class TeamDetailsComponent implements OnInit {
    public teams: Team[] = [];

    public activeTeam: Team = null;

    private activeTeamId: string = null;

    public loading = true;

    constructor(
        private titleService: Title,
        private dataService: FaceoffDataService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        titleService.setTitle('Lag detaljer | Face Off');
        dataService.teamsDataContext.subscribe(data => this.dataLoaded(data));
    }

    ngOnInit(): void {
        const params$ = this.route.paramMap;
        params$.subscribe(p => this.teamChange(p));
    }

    private teamChange(params: ParamMap) {
        this.activeTeamId = params.get('team');

        this.initActiveTeam();
    }

    private initActiveTeam(): void {
        this.activeTeam = this.teams.find(t => t.id === this.activeTeamId);

        if (this.activeTeam != null) {
            this.titleService.setTitle(`Lag detaljer - ${this.activeTeam.name} | Face Off`);
            return;
        }

        this.titleService.setTitle('Lag detaljer | Face Off');
    }

    private dataLoaded(dataContext: TeamsDataContext): void {
        this.teams = dataContext.teams;
        this.initActiveTeam();

        this.loading = false;
    }
}
