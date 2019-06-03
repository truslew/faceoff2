import { Team } from '../models/team';
import { Match } from '../models/match';
import { TableTeam } from '../models/tableTeam';
import { Group } from '../models/group';

export class TableGeneratorService {
    private teams: Team[];
    private matches: Match[];
    private result: TableTeam[];

    constructor(group: Group) {
        this.teams = group.teams;
        this.matches = group.matches;

        this.result = [];

        if (this.teams != null && this.matches != null) {
            this.initTable();
            this.countMatches();
            this.countWonDrawnLost();

            this.sortTable();
            this.setRank();
        }
    }

    public generate(): TableTeam[] {
        return this.result;
    }

    private initTable(): void {
        this.result = this.teams.map(t => new TableTeam(t));
    }

    private countMatches(): void {
        this.result.forEach(t => (t.played = this.countMatchesForTeam(t.team.id)));
    }

    private countMatchesForTeam(teamId: number): number {
        return this.matches.filter(
            m => m.isPlayed && m.team1 != null && m.team2 != null && (m.team1.id === teamId || m.team2.id === teamId)
        ).length;
    }

    private countWonDrawnLost(): void {
        this.result.forEach(t => {
            t.won = this.countWonForTeam(t.team.id);
            t.lost = this.countLostForTeam(t.team.id);
            t.drawn = t.played - t.won - t.lost;
            t.points = t.won * 2 + t.drawn;
            t.for = this.countScoredForTeam(t.team.id);
            t.against = this.countAgainstForTeam(t.team.id);
            t.goalDifference = t.for - t.against;
        });
    }

    private countWonForTeam(teamId: number): number {
        return this.matches.filter(m => this.winnerOfMatch(m) === teamId).length;
    }

    private winnerOfMatch(match: Match): number {
        const winner = match.winner;
        if (winner != null) {
            return winner.id;
        }

        return null;
    }

    private countLostForTeam(teamId: number): number {
        return this.matches.filter(m => this.looserOfMatch(m) === teamId).length;
    }

    private looserOfMatch(match: Match): number {
        const looser = match.looser;
        if (looser != null) {
            return looser.id;
        }

        return null;
    }

    private countScoredForTeam(teamId: number): number {
        return this.matches.map(m => this.scoredByTeamInMatch(teamId, m)).reduce((p, c) => p + c, 0);
    }

    private scoredByTeamInMatch(teamId: number, match: Match) {
        if (match.isPlayed) {
            if (match.team1.id === teamId) {
                return match.result.goals1;
            }
            if (match.team2.id === teamId) {
                return match.result.goals2;
            }
        }

        return 0;
    }

    private countAgainstForTeam(teamId: number): number {
        return this.matches.map(m => this.againstTeamInMatch(teamId, m)).reduce((p, c) => p + c, 0);
    }

    private againstTeamInMatch(teamId: number, match: Match) {
        if (match.isPlayed) {
            if (match.team1.id === teamId) {
                return match.result.goals2;
            }
            if (match.team2.id === teamId) {
                return match.result.goals1;
            }
        }

        return 0;
    }

    private sortTable(): void {
        this.result = this.result.sort((a, b) => this.teamCompare(a, b));
    }

    private teamCompare(a: TableTeam, b: TableTeam): number {
        let result = b.points - a.points;
        if (result !== 0) {
            return result;
        }

        result = b.goalDifference - a.goalDifference;
        if (result !== 0) {
            return result;
        }

        result = b.for - a.for;
        if (result !== 0) {
            return result;
        }

        const match = this.matches.find(m => m.isPlayed && m.isForTeams(a.team, b.team));
        if (match != null) {
            const winner = match.winner;
            if (winner != null) {
                return winner.id === a.team.id ? -1 : 1;
            }
        }

        if (a.team.weight != null && b.team.weight != null) {
            result = b.team.weight - a.team.weight;
            if (result !== 0) {
                return result;
            }
        }

        let ri = a.team.id;
        if (a.sameRankId != null) {
            ri = a.sameRankId;
        }
        if (b.sameRankId != null) {
            ri = b.sameRankId;
        }

        if (a.sameRankId != null) {
            this.result.filter(t => t.sameRankId === a.sameRankId).forEach(t => (t.sameRankId = ri));
        }

        if (b.sameRankId != null) {
            this.result.filter(t => t.sameRankId === b.sameRankId).forEach(t => (t.sameRankId = ri));
        }

        a.sameRankId = ri;
        b.sameRankId = ri;

        return a.team.name.localeCompare(b.team.name);
    }

    private setRank(): void {
        for (let index = 0; index < this.result.length; index++) {
            const element = this.result[index];

            if (index >= 1) {
                const prior = this.result[index - 1];
                if (prior.sameRankId == null || element.sameRankId == null || prior.sameRankId !== element.sameRankId) {
                    element.rank = index + 1;
                } else {
                    element.rank = prior.rank;
                }
            } else {
                element.rank = 1;
            }
        }
    }
}
