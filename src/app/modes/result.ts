import { Match } from 'app/models/match';

export class Result {
    public key: string;
    public matchId: number;
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

export enum MatchStatus {
    Unplayed,
    Current,
    Played
}
