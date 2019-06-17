import { Match } from './match';

export class MatchLink {
    matchId: string;
    match: Match;

    public get isValid(): boolean {
        return this.match != null;
    }
}

export interface MatchLinkDao {
    matchId: string;

}
