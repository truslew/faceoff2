import { AgeClass } from './ageClass';
import { Ident } from './ident';
import { Match } from './match';
import { TableTeam } from './tableTeam';
import { Team } from './team';

export class Group {
    public id: string;
    public name: string;
    public ageClassId: string;

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

export interface GroupDao {
    id: string;
    name: string;
    ageClassId: string;
}

export interface GroupDaoEx extends GroupDao, Ident {
}
