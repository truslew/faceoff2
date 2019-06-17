import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { AgeClass, AgeClassDaoEx } from '../models/ageClass';
import { Group, GroupDaoEx } from '../models/group';
import { Match, MatchDaoEx } from '../models/match';
import { MatchStatus } from '../models/MatchStatus';
import { Result, ResultDao, ResultDaoEx } from '../models/result';
import { Team, TeamDaoEx } from '../models/team';
import { TeamsDataContext } from '../models/teamsDataContext';
import { AgeClassService } from './age-class.service';
import { GroupsService } from './groups.service';
import { MatchesService } from './matches.service';
import { RelationshipBuilder } from './relationship-builder';
import { TeamsService } from './teams.service';
import { ResultsService } from './results.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FaceoffDataService {
    private angularFireAuth: AngularFireAuth;
    private angularFireDatabase: AngularFireDatabase;

    private builder = new RelationshipBuilder();

    public ageClasses = new BehaviorSubject<AgeClass[]>([]);
    public groups = new BehaviorSubject<Group[]>([]);
    public teams = new BehaviorSubject<Team[]>([]);
    public matches = new BehaviorSubject<Match[]>([]);
    public results = new BehaviorSubject<Result[]>([]);

    public teamsDataContext = new BehaviorSubject<TeamsDataContext>(new TeamsDataContext());

    public authenticated = new BehaviorSubject<boolean>(false);

    public connected = new BehaviorSubject<boolean>(false);

    public isHenning = new BehaviorSubject<boolean>(false);

    constructor(
        angularFireAuth: AngularFireAuth,
        angularFireDatabase: AngularFireDatabase,
        private ageClassService: AgeClassService,
        private groupsService: GroupsService,
        private teamsService: TeamsService,
        private matchesServcie: MatchesService,
        private resultsService: ResultsService
    ) {
        this.angularFireAuth = angularFireAuth;
        this.angularFireDatabase = angularFireDatabase;

        this.angularFireAuth.authState.subscribe(auth => {
            this.authenticated.next(auth != null);
            this.isHenning.next(auth != null && auth.email === 'henning@truslew.no');
        });

        this.ageClassService.all().subscribe(data => this.ageClasses.next(this.mapAgeClass(data)));
        this.groupsService.all().subscribe(data => this.groups.next(this.mapGroups(data)));
        this.teamsService.all().subscribe(data => this.teams.next(this.mapTeams(data)));
        this.matchesServcie.all().subscribe(data => this.matches.next(this.mapMatches(data)));
        this.resultsService.all().subscribe(data => this.results.next(this.mapResults(data)));

        this.ageClasses.subscribe(data => {
            this.builder.ageClasses = data;
            this.createDataContext();
        });

        this.groups.subscribe(data => {
            this.builder.groups = data;
            this.createDataContext();
        });

        this.teams.subscribe(data => {
            this.builder.teams = data;
            this.createDataContext();
        });

        this.matches.subscribe(data => {
            this.builder.matches = data;
            this.createDataContext();
        });

        this.results.subscribe(data => {
            this.builder.results = data;
            this.createDataContext();
        });
    }

    private createDataContext(): void {
        this.teamsDataContext.next(this.builder.build());
    }

    private mapAgeClass(data: AgeClassDaoEx[]): AgeClass[] {
        const result = data
            .map(d => {
                const c = new AgeClass();
                c.id = d.id;
                c.name = d.name;
                c.showGroups = d.showGroups;
                return c;
            })
            .sort((t1, t2) => t1.name.localeCompare(t2.name));

        return result;
    }

    private mapGroups(data: GroupDaoEx[]): Group[] {
        const result = data
            .map(d => {
                const g = new Group();
                g.id = d.id;
                g.name = d.name;
                g.ageClassId = d.ageClassId;
                return g;
            })
            .sort((t1, t2) => t1.name.localeCompare(t2.name));

        return result;
    }

    private mapTeams(data: TeamDaoEx[]): Team[] {
        const result = data.map(d => {
            const t = new Team();
            t.id = d.id;
            t.groupId = d.groupId;
            t.name = d.name;
            t.ident = d.ident;
            t.weight = d.weight;
            return t;
        });

        return result;
    }

    private mapMatches(data: MatchDaoEx[]): Match[] {
        const result = data.map(d => this.mapMatch(d)).sort((t1: Match, t2: Match) => t1.start.diff(t2.start, 'seconds'));
        return result;
    }

    private mapMatch(data: MatchDaoEx): Match {
        const t = new Match();
        t.id = data.id;
        t.ageClassId = data.ageClassId;
        t.groupId = data.groupId;
        t.teamId1 = data.teamId1;
        t.teamId2 = data.teamId2;
        t.start = moment(data.start.seconds * 1000);
        t.t1 = data.t1;
        t.t2 = data.t2;
        t.text1 = data.text1;
        t.text2 = data.text2;
        t.description = data.description;

        // if (data.groupLink1 != null) {
        //     t.groupLink1 = new GroupLink();
        //     t.groupLink1.groupId = data.groupLink1.groupId;
        //     t.groupLink1.rank = this.toInt(data.groupLink1.rank);
        // }

        // if (data.groupLink2 != null) {
        //     t.groupLink2 = new GroupLink();
        //     t.groupLink2.groupId = data.groupLink2.groupId;
        //     t.groupLink2.rank = this.toInt(data.groupLink2.rank);
        // }

        // if (data.matchLink1 != null) {
        //     t.matchLink1 = new MatchLink();
        //     t.matchLink1.matchId = data.matchLink1.matchId;
        // }

        // if (data.matchLink2 != null) {
        //     t.matchLink2 = new MatchLink();
        //     t.matchLink2.matchId = data.matchLink2.matchId;
        // }

        return t;
    }

    private mapResults(data: ResultDaoEx[]): Result[] {
        const result = data.map(d => this.mapResult(d));
        return result;
    }

    private mapResult(data: ResultDaoEx): Result {
        const result = new Result();
        result.id = data.id;
        result.status = this.getStatusFromChar(data.status);
        result.goals1 = this.toInt(data.goals1);
        result.goals2 = this.toInt(data.goals2);
        return result;
    }

    private toInt(value: any): number {
        const result = parseInt(value, 10);
        return Number.isInteger(result) ? result : null;
    }

    public saveResult(matchId: string, goals1: number, goals2: number, status: MatchStatus): void {
        const data: ResultDaoEx = {
            id: matchId,
            goals1,
            goals2,
            status: this.getStatusChar(status)
        };

        this.resultsService.addWithId(data).subscribe(() => console.log('Saved'), err => console.error(err));
    }

    private getStatusFromChar(char: string): MatchStatus {
        switch (char) {
            case 'P':
                return MatchStatus.Played;
            case 'C':
                return MatchStatus.Current;
            default:
                return MatchStatus.Unplayed;
        }
    }

    private getStatusChar(status: MatchStatus): string {
        if (status === MatchStatus.Played) {
            return 'P';
        }

        if (status === MatchStatus.Current) {
            return 'C';
        }

        return 'U';
    }
}
