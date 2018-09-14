import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
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
    public results: Result[] = [];

    public loading = true;
    public isAutenticated = false;

    constructor(titleService: Title, private dataService: FaceoffDataService, private route: ActivatedRoute) {
        titleService.setTitle('Kamp registrering | Face Off');

        dataService.authenticated.subscribe(auth => (this.isAutenticated = auth));
        dataService.teamsDataContext.subscribe(data => this.dataLoaded(data));
    }

    ngOnInit(): void {
        const params$ = this.route.paramMap;
        params$.subscribe(p => this.matchChange(p));
    }

    public get goals1(): number {
        const result = this.getResult();
        return result != null ? result.goals1 : 0;
    }

    public get goals2(): number {
        const result = this.getResult();
        return result != null ? result.goals2 : 0;
    }

    public get status(): MatchStatus {
        const result = this.getResult();
        return result != null ? result.status : MatchStatus.Unplayed;
    }

    public get match(): Match {
        if (this.matchId != null) {
            return this.matches.find(c => c.id === this.matchId);
        }

        return null;
    }

    public getResult(): Result {
        if (this.matchId != null) {
            return this.results.find(c => c.matchId === this.matchId);
        }

        return null;
    }

    private matchChange(params: ParamMap) {
        this.matchId = this.getParamNumber(params, 'match');
    }

    private getParamNumber(params: ParamMap, name: string): number {
        const id = parseInt(params.get(name), 10);
        return id > 0 ? id : null;
    }

    private dataLoaded(dataContext: TeamsDataContext): void {
        this.matches = dataContext.matches;
        this.results = dataContext.results;

        this.loading = !dataContext.matchesReady;
    }

    public goal(teamIndex: number, increment: number): void {
        switch (teamIndex) {
            case 1:
                const goals1 = this.ensureRange(this.goals1, increment);
                this.updateResult(goals1, this.goals2, this.status);
                break;
            case 2:
                const goals2 = this.ensureRange(this.goals2, increment);
                this.updateResult(this.goals1, goals2, this.status);
                break;
        }
    }

    private ensureRange(current: number, increment: number): number {
        const newValue = current != null ? current + increment : increment;
        if (newValue < 0) {
            return 0;
        }

        return newValue;
    }

    private updateResult(goals1: number, goals2: number, status: MatchStatus): void {
        if (this.match != null) {
            this.dataService.saveResult(this.matchId, goals1, goals2, status);
        }
    }

    private setStatus(status: MatchStatus): void {
        this.updateResult(this.goals1, this.goals2, status);
    }
}
