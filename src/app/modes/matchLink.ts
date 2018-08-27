import { Match } from 'app/models/match';

export class MatchLink {
    matchId: number;
    match: Match;

    public get isValid(): boolean {
        return this.match != null;
    }
}
