import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Match } from '../modes/match';
import { Result, MatchStatus } from '../modes/result';
import { FaceoffDataService } from '../services/faceoff-data.service';
import { TeamsDataContext } from '../modes/teamsDataContext';

@Component({
    selector: 'app-match-play',
    templateUrl: './match-play.component.html'
})
export class MatchPlayComponent implements OnInit {
    private matchId: number = null;
    public matches: Match[] = [];
    public match: Match = null;

    public results: Result[] = [];
    public result: Result = null;

    public loading = true;

    public goals1 = 0;
    public goals2 = 0;

    public status: MatchStatus = MatchStatus.Unplayed;

    public firstLoad: boolean;

    constructor(
        private titleService: Title,
        private dataService: FaceoffDataService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        titleService.setTitle('Kamp registrering | Face Off');

        dataService.teamsDataContext.subscribe(data => this.dataLoaded(data));
    }

    ngOnInit(): void {
        const params$ = this.route.paramMap;
        params$.subscribe(p => this.matchChange(p));
    }

    private matchChange(params: ParamMap) {
        this.matchId = this.getParamNumber(params, 'match');
        this.firstLoad = true;
        this.initMatch();
    }

    private getParamNumber(params: ParamMap, name: string): number {
        const id = parseInt(params.get(name), 10);
        return id > 0 ? id : null;
    }

    private dataLoaded(dataContext: TeamsDataContext): void {
        this.matches = dataContext.matches;
        this.results = dataContext.results;

        this.initMatch();

        this.loading = !dataContext.matchesReady;
    }

    private initMatch(): void {
        if (this.matchId != null) {
            this.match = this.matches.find(c => c.id === this.matchId);
            this.result = this.results.find(c => c.matchId === this.matchId);

            if (this.firstLoad && this.result != null) {
                this.goals1 = this.result.goals1;
                this.goals2 = this.result.goals2;
                this.status = this.result.status;
                this.firstLoad = false;
            }

            return;
        }

        this.match = null;
        this.result = null;
        this.status = 0;
    }

    public goal(teamIndex: number, increment: number): void {
        switch (teamIndex) {
            case 1:
                this.goals1 = this.ensureRange(this.goals1, increment);
                break;
            case 2:
                this.goals2 = this.ensureRange(this.goals2, increment);
                break;
        }

        this.updateResult();
    }

    private ensureRange(current: number, increment: number): number {
        const newValue = current != null ? current + increment : increment;
        if (newValue < 0) {
            return 0;
        }

        return newValue;
    }

    private updateResult(): void {
        if (this.match != null) {
            this.dataService.saveResult(this.match.id, this.goals1, this.goals2, this.status);
        }
    }

    private setStatus(status: MatchStatus): void {
        this.status = status;
        this.updateResult();
    }
}
