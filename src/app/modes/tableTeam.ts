import { Team } from './team';

export class TableTeam {
    public team: Team;
    public played: number;
    public won: number;
    public drawn: number;
    public lost: number;
    public for: number;
    public against: number;
    public goalDifference: number;
    public points: number;

    public rank;
    public sameRankId: number;

    constructor(team: Team) {
        this.team = team;
    }

    public get classId(): string {
        if (this.sameRankId != null) {
            return 'S';
        }

        if (this.rank === 1) {
            return 'W';
        }

        return 'D';
    }
}
