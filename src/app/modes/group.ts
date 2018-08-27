import { AgeClass } from './ageClass';
import { Team } from './team';
import { Match } from './match';
import { TableTeam } from './tableTeam';

export class Group {
    public id: number;
    public name: string;
    public ageClassId: number;

    public ageClass: AgeClass;
    teams: Team[] = [];
    matches: Match[] = [];

    table: TableTeam[] = [];

    public get hasTeams(): boolean {
        return this.teams != null && this.teams.length > 0;
    }

    public get hasMatches(): boolean {
        return this.matches != null && this.matches.length > 0;
    }

    public get hasData(): boolean {
        return this.hasTeams && this.hasMatches;
    }

    public isAllMatchedPlayed(): boolean {
        const matchCount = this.matches.length;
        const playedCount = this.matches.filter(m => m.isPlayed).length;
        return matchCount > 0 && matchCount === playedCount;
    }

    public getRank(rank: number): Team {
        const teams = this.table.filter(t => t.rank === rank);
        if (teams.length === 1) {
            return teams[0].team;
        }

        return null;
    }
}
