import { AgeClass } from '../../modes/ageClass';
import { Group } from '../../modes/group';
import { Team } from '../../modes/team';
import { Match } from '../../modes/match';
import { Result } from '../../modes/result';
import { TeamsDataContext } from '../../modes/teamsDataContext';
import { GroupLink } from '../../modes/groupLink';
import { MatchLink } from '../../modes/matchLink';
import * as _ from 'lodash';
import { TableGeneratorService } from './table-generator.service';

export class RelationshipBuilder {
    public ageClasses: AgeClass[] = [];
    public groups: Group[] = [];
    public teams: Team[] = [];
    public matches: Match[] = [];
    public results: Result[] = [];

    public build(): TeamsDataContext {
        this.ageClassesAddGroups();
        this.groupsAddTeams();
        this.groupsAddMatches();
        this.matchesAddTeams();
        this.matchesAddAgeClass();

        this.ageClassesAddTeams();
        this.teamsAddMatches();
        this.matchesAddResult();

        this.groupsAddTable();

        this.matchAddTeamsFromGroups();
        this.matchAddTeamsFromMatch();

        const result = new TeamsDataContext();
        result.ageClasses = this.ageClasses;
        result.groups = this.groups;
        result.teams = this.teams;
        result.matches = this.matches;
        result.results = this.results;

        result.teamsReady = this.teamsReady();
        result.matchesReady = this.matchesReady();

        return result;
    }

    public teamsReady(): boolean {
        return this.ageClasses.length > 0 && this.groups.length > 0 && this.teams.length > 0;
    }

    public matchesReady(): boolean {
        return this.teamsReady() && this.matches.length > 0;
    }

    private ageClassesAddGroups(): void {
        this.ageClasses.forEach((c: AgeClass) => this.ageClassAddGroups(c));
    }

    private ageClassAddGroups(ageClass: AgeClass): void {
        ageClass.groups = this.groups
            .filter((g: Group) => g.ageClassId === ageClass.id)
            .sort((g1: Group, g2: Group) => g1.name.localeCompare(g2.name));

        ageClass.groups.forEach(g => (g.ageClass = ageClass));
    }

    private ageClassesAddTeams(): void {
        this.ageClasses.forEach((c: AgeClass) => this.ageClassAddTeams(c));
    }

    private ageClassAddTeams(c: AgeClass): void {
        c.teams = _.sortBy(_.flatten(c.groups.map(g => g.teams)), (t: Team) => t.name);
    }

    private groupsAddTeams(): void {
        this.groups.forEach(g => this.groupAddTeams(g));
    }

    private groupAddTeams(group: Group): void {
        group.teams = this.teams
            .filter(t => t.groupId === group.id)
            .sort((t1: Team, t2: Team) => t1.name.localeCompare(t2.name));

        group.teams.forEach((t: Team) => (t.group = group));
    }

    private groupsAddMatches(): void {
        this.groups.forEach(g => this.groupAddMatches(g));
    }

    private groupAddMatches(group: Group): void {
        group.matches = this.matches
            .filter(t => t.groupId === group.id)
            .sort((t1: Match, t2: Match) => t1.start.diff(t2.start, 'seconds'));

        group.matches.forEach((m: Match) => (m.group = group));
    }

    private matchesAddAgeClass(): void {
        this.matches.forEach(m => this.matchAddAgeClass(m));
    }

    private matchAddAgeClass(match: Match): void {
        match.ageClass = this.ageClasses.find(c => c.id === match.ageClassId);

        if (match.groupLink1 != null) {
            match.groupLink1.group = this.groups.find(g => g.id === match.groupLink1.groupId);
        }

        if (match.groupLink2 != null) {
            match.groupLink2.group = this.groups.find(g => g.id === match.groupLink2.groupId);
        }

        if (match.matchLink1 != null) {
            match.matchLink1.match = this.matches.find(m => m.id === match.matchLink1.matchId);
        }

        if (match.matchLink2 != null) {
            match.matchLink2.match = this.matches.find(m => m.id === match.matchLink2.matchId);
        }
    }

    private matchesAddTeams(): void {
        this.matches.forEach(m => this.matchAddTeams(m));
    }

    private matchAddTeams(match: Match): void {
        if (match.teamId1 != null) {
            match.team1 = this.teams.find(t => t.id === match.teamId1);
        } else {
            match.team1 = this.teams.find(t => t.groupId === match.groupId && t.ident === match.t1);
        }

        if (match.teamId2 != null) {
            match.team2 = this.teams.find(t => t.id === match.teamId2);
        } else {
            match.team2 = this.teams.find(t => t.groupId === match.groupId && t.ident === match.t2);
        }
    }

    private teamsAddMatches(): void {
        this.teams.forEach(t => this.teamAddMatches(t));
    }

    private teamAddMatches(team: Team): void {
        team.matches = this.matches
            .filter(m => (m.team1 != null && m.team1.id === team.id) || (m.team2 != null && m.team2.id === team.id))
            .sort((t1: Match, t2: Match) => t1.start.diff(t2.start, 'seconds'));
    }

    public matchesAddResult(): void {
        this.matches.forEach(m => (m.result = this.results.find(r => r.matchId === m.id)));
    }

    private groupsAddTable(): void {
        this.groups.forEach(g => this.groupAddTable(g));
    }

    private groupAddTable(group: Group): void {
        const creator = new TableGeneratorService(group);
        group.table = creator.generate();
    }

    private matchAddTeamsFromGroups(): void {
        const finals = this.matches.filter(m => m.isFinale);
        finals.forEach(m => this.matchAddTeamFromGroups(m));
    }

    private matchAddTeamFromGroups(match: Match): void {
        match.team1 = this.getTeamFromGroupLink(match.groupLink1);
        if (match.team1 != null) {
            match.team1.matches.push(match);
        }

        match.team2 = this.getTeamFromGroupLink(match.groupLink2);
        if (match.team2 != null) {
            match.team2.matches.push(match);
        }
    }

    private getTeamFromGroupLink(groupLink: GroupLink): Team {
        if (groupLink != null && groupLink.isValid && groupLink.group.isAllMatchedPlayed()) {
            return groupLink.group.getRank(groupLink.rank);
        }

        return null;
    }

    private matchAddTeamsFromMatch(): void {
        const finals = this.matches.filter(m => m.isFinale && (m.matchLink1 != null || m.matchLink2 != null));
        finals.forEach(m => this.matchAddTeamFromMatch(m));
    }

    private matchAddTeamFromMatch(match: Match): void {
        match.team1 = this.getTeamFromMatchLink(match.matchLink1);
        if (match.team1 != null) {
            match.team1.matches.push(match);
        }

        match.team2 = this.getTeamFromMatchLink(match.matchLink2);
        if (match.team2 != null) {
            match.team2.matches.push(match);
        }
    }

    private getTeamFromMatchLink(matchLink: MatchLink): Team {
        if (matchLink != null && matchLink.isValid) {
            return matchLink.match.winner;
        }

        return null;
    }
}
