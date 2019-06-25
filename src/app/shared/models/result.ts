import { Match } from './match';
import { MatchStatus } from './MatchStatus';
import { Ident } from './ident';

export class Result {
    public id: string;
    public status: MatchStatus;

    public goals1: number;
    public goals2: number;

    public match: Match;

    public get statusText(): string {
        switch (this.status) {
            case MatchStatus.Played:
                return 'Ferdig spilt';
            case MatchStatus.Current:
                return 'Spilles nå';
            default:
                return 'Uspilt';
        }
    }
}

export interface ResultDao {
    status: string;

    goals1: number;
    goals2: number;
}

export interface ResultDaoEx extends ResultDao, Ident {}
