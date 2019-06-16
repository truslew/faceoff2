import { AgeClass } from './ageClass';
import { Group } from './group';
import { Team } from './team';
import { GroupLink } from './groupLink';
import { MatchLink } from './matchLink';
import { Result } from './result';
import { MatchStatus } from './MatchStatus';
import * as moment from 'moment';
import { Ident } from './ident';

export class Match {
    public id: string;
    public ageClassId: string;
    public groupId: string;
    public teamId1: string;
    public teamId2: string;
    public start: moment.Moment;

    public t1: string;
    public t2: string;

    public description: string;

    public ageClass: AgeClass;
    public group: Group;
    public team1: Team;
    public team2: Team;

    public text1: string;
    public text2: string;

    public groupLink1: GroupLink;
    public groupLink2: GroupLink;

    public matchLink1: MatchLink;
    public matchLink2: MatchLink;

    public result: Result = null;

    public get isFinale(): boolean {
        return this.group == null;
    }

    public get isPlayed(): boolean {
        return this.result != null && this.result.status === MatchStatus.Played && this.result.goals1 != null && this.result.goals2 != null;
    }

    public get winner(): Team {
        if (this.isPlayed) {
            if (this.result.goals1 > this.result.goals2) {
                return this.team1;
            }

            if (this.result.goals1 < this.result.goals2) {
                return this.team2;
            }
        }

        return null;
    }

    public get looser(): Team {
        if (this.isPlayed) {
            if (this.result.goals1 > this.result.goals2) {
                return this.team2;
            }

            if (this.result.goals1 < this.result.goals2) {
                return this.team1;
            }
        }

        return null;
    }

    public get description1(): string {
        if (this.team1 != null) {
            return this.team1.name;
        }

        if (this.groupLink1 != null && this.groupLink1.isValid) {
            return `${this.groupLink1.group.name} - #${this.groupLink1.rank}`;
        }

        if (this.matchLink1 != null && this.matchLink1.isValid) {
            return `Vinner #${this.matchLink1.match.id} - ${this.matchLink1.match.description}`;
        }

        if (this.text1 != null && this.text1 !== '') {
            return this.text1;
        }

        return this.t1;
    }

    public get description2(): string {
        if (this.team2 != null) {
            return this.team2.name;
        }

        if (this.groupLink2 != null && this.groupLink2.isValid) {
            return `${this.groupLink2.group.name} - #${this.groupLink2.rank}`;
        }

        if (this.matchLink2 != null && this.matchLink2.isValid) {
            return `Vinner #${this.matchLink2.match.id} - ${this.matchLink2.match.description}`;
        }

        if (this.text2 != null && this.text2 !== '') {
            return this.text2;
        }

        return this.t2;
    }

    public isForTeams(a: Team, b: Team): boolean {
        if (this.team1 == null || this.team2 == null) {
            return false;
        }

        return (this.team1.id === a.id && this.team2.id === b.id) || (this.team1.id === b.id && this.team2.id === a.id);
    }

    public get showGoals(): boolean {
        return this.result != null && (this.result.status === MatchStatus.Current || this.result.status === MatchStatus.Played);
    }

    public get goal1Classes(): string {
        if (this.isPlayed) {
            const winner = this.winner;
            return winner != null && winner.id === this.team1.id ? 'badge badge-success' : 'badge badge-secondary';
        }

        return 'badge badge-info';
    }

    public get goal2Classes(): string {
        if (this.isPlayed) {
            const winner = this.winner;
            return winner != null && winner.id === this.team2.id ? 'badge badge-success' : 'badge badge-secondary';
        }

        return 'badge badge-info';
    }

    public get status(): MatchStatus {
        return this.result != null ? this.result.status : 0;
    }
}

export interface MatchDao {
    ageClassId: string;
    groupId: string;
    teamId1: string;
    teamId2: string;
    start: any; // Java Timetsamp type

    t1: string;
    t2: string;

    text1: string;
    text2: string;

    description: string;
}

export interface MatchDaoEx extends MatchDao, Ident {}
