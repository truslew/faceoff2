import { Team } from 'app/models/team';
import { AgeClass } from 'app/models/ageClass';
import { Group } from 'app/models/group';
import { Match } from 'app/models/match';
import { Result, MatchStatus } from 'app/models/result';
import { RelationshipBuilder } from 'app/services/relationship-builder';
import { TableGeneratorService } from 'app/services/table-generator.service';
import * as moment from 'moment';

describe('Table generator', () => {
    it('Test set 1', () => {
        const builder = new RelationshipBuilder();
        builder.ageClasses = ageClasses();
        builder.groups = groups();
        builder.teams = newTeams4();
        builder.matches = newMatches();
        builder.results = newResults();

        const dataContext = builder.build();

        const table = builder.groups[0].table;
        expect(table.length).toBe(4);

        const r1 = table[0];
        const r2 = table[1];
        const r3 = table[2];
        const r4 = table[3];

        expect(r1.team.id).toBe(1, 'id');
        expect(r1.played).toBe(3, 'played');
        expect(r1.won).toBe(1, 'won');
        expect(r1.drawn).toBe(2, 'drawn');
        expect(r1.lost).toBe(0, 'lost');
        expect(r1.for).toBe(8, 'for');
        expect(r1.against).toBe(7, 'against');
        expect(r1.goalDifference).toBe(1, 'gd');
        expect(r1.points).toBe(4, 'points');
        expect(r1.rank).toBe(1, 'rank');

        expect(r2.team.id).toBe(2, 'id');
        expect(r2.played).toBe(3, 'played');
        expect(r2.won).toBe(1, 'won');
        expect(r2.drawn).toBe(2, 'drawn');
        expect(r2.lost).toBe(0, 'lost');
        expect(r2.for).toBe(8, 'for');
        expect(r2.against).toBe(7, 'against');
        expect(r2.goalDifference).toBe(1, 'gd');
        expect(r2.points).toBe(4, 'points');
        expect(r2.rank).toBe(1, 'rank');

        expect(r3.team.id).toBe(3, 'id');
        expect(r3.played).toBe(3, 'played');
        expect(r3.won).toBe(0, 'won');
        expect(r3.drawn).toBe(2, 'drawn');
        expect(r3.lost).toBe(1, 'lost');
        expect(r3.for).toBe(6, 'for');
        expect(r3.against).toBe(7, 'against');
        expect(r3.goalDifference).toBe(-1, 'gd');
        expect(r3.points).toBe(2, 'points');
        expect(r3.rank).toBe(3, 'rank');

        expect(r4.team.id).toBe(4, 'id');
        expect(r4.played).toBe(3, 'played');
        expect(r4.won).toBe(0, 'won');
        expect(r4.drawn).toBe(2, 'drawn');
        expect(r4.lost).toBe(1, 'lost');
        expect(r4.for).toBe(6, 'for');
        expect(r4.against).toBe(7, 'against');
        expect(r4.goalDifference).toBe(-1, 'gd');
        expect(r4.points).toBe(2, 'points');
        expect(r4.rank).toBe(3, 'rank');

        expect(r1.sameRankId).toBe(r2.sameRankId, 'sameRankId');
        expect(r3.sameRankId).toBe(r4.sameRankId, 'sameRankId');
    });

    // http://teamplaycup.se/cup/?overviewgroup&home=plankecup/17&scope=G12-1
    it('Test set 2', () => {
        const builder = new RelationshipBuilder();
        builder.ageClasses = ageClasses();
        builder.groups = groups();
        builder.teams = newTeams5();
        builder.matches = newMatches5();
        builder.results = newResults5();

        const dataContext = builder.build();

        const table = builder.groups[0].table;
        expect(table.length).toBe(5);

        const r1 = table[0];
        const r2 = table[1];
        const r3 = table[2];
        const r4 = table[3];
        const r5 = table[4];

        expect(r1.team.id).toBe(1, 'id');
        expect(r1.played).toBe(4, 'played');
        expect(r1.won).toBe(3, 'won');
        expect(r1.drawn).toBe(0, 'drawn');
        expect(r1.lost).toBe(1, 'lost');
        expect(r1.for).toBe(40, 'for');
        expect(r1.against).toBe(11, 'against');
        expect(r1.points).toBe(6, 'points');
        expect(r1.rank).toBe(1, 'rank');

        expect(r2.team.id).toBe(2, 'id');
        expect(r2.played).toBe(4, 'played');
        expect(r2.won).toBe(3, 'won');
        expect(r2.drawn).toBe(0, 'drawn');
        expect(r2.lost).toBe(1, 'lost');
        expect(r2.for).toBe(32, 'for');
        expect(r2.against).toBe(5, 'against');
        expect(r2.points).toBe(6, 'points');
        expect(r2.rank).toBe(2, 'rank');

        expect(r3.team.id).toBe(3, 'id');
        expect(r3.played).toBe(4, 'played');
        expect(r3.won).toBe(3, 'won');
        expect(r3.drawn).toBe(0, 'drawn');
        expect(r3.lost).toBe(1, 'lost');
        expect(r3.for).toBe(34, 'for');
        expect(r3.against).toBe(17, 'against');
        expect(r3.points).toBe(6, 'points');
        expect(r3.rank).toBe(3, 'rank');

        expect(r4.team.id).toBe(4, 'id');
        expect(r4.played).toBe(4, 'played');
        expect(r4.won).toBe(1, 'won');
        expect(r4.drawn).toBe(0, 'drawn');
        expect(r4.lost).toBe(3, 'lost');
        expect(r4.for).toBe(19, 'for');
        expect(r4.against).toBe(29, 'against');
        expect(r4.points).toBe(2, 'points');
        expect(r4.rank).toBe(4, 'rank');

        expect(r5.team.id).toBe(5, 'id');
        expect(r5.played).toBe(4, 'played');
        expect(r5.won).toBe(0, 'won');
        expect(r5.drawn).toBe(0, 'drawn');
        expect(r5.lost).toBe(4, 'lost');
        expect(r5.for).toBe(4, 'for');
        expect(r5.against).toBe(67, 'against');
        expect(r5.points).toBe(0, 'points');
        expect(r5.rank).toBe(5, 'rank');
    });
});

function ageClasses(): AgeClass[] {
    const ageClass = new AgeClass();
    ageClass.id = 1;
    ageClass.name = 'C1';

    return [ageClass];
}

function groups(): Group[] {
    const group = new Group();
    group.id = 1;
    group.name = 'C1';

    return [group];
}

function newTeams4(): Team[] {
    const teams: Team[] = [];
    teams.push(newTeam(1, 'A'));
    teams.push(newTeam(2, 'B'));
    teams.push(newTeam(3, 'C'));
    teams.push(newTeam(4, 'D'));
    return teams;
}

function newTeams5(): Team[] {
    const teams: Team[] = [];
    teams.push(newTeam(1, 'A'));
    teams.push(newTeam(2, 'B'));
    teams.push(newTeam(3, 'C'));
    teams.push(newTeam(4, 'D'));
    teams.push(newTeam(5, 'E'));
    return teams;
}

function newTeam(id: number, name: string): Team {
    const team = new Team();
    team.groupId = 1;
    team.id = id;
    team.name = name;

    return team;
}

function newMatches(): Match[] {
    const matches: Match[] = [];
    matches.push(newMatch(1, 1, 2));
    matches.push(newMatch(2, 3, 4));

    matches.push(newMatch(3, 1, 4));
    matches.push(newMatch(4, 3, 2));

    matches.push(newMatch(5, 1, 3));
    matches.push(newMatch(6, 2, 4));

    return matches;
}

function newMatches5(): Match[] {
    const matches: Match[] = [];
    matches.push(newMatch(1, 4, 3));
    matches.push(newMatch(6, 5, 1));
    matches.push(newMatch(45, 5, 4));
    matches.push(newMatch(46, 3, 2));
    matches.push(newMatch(61, 1, 3));
    matches.push(newMatch(62, 4, 2));
    matches.push(newMatch(85, 3, 5));
    matches.push(newMatch(90, 2, 1));
    matches.push(newMatch(138, 2, 5));
    matches.push(newMatch(145, 1, 4));

    return matches;
}

function newMatch(id: number, t1: number, t2: number): Match {
    const match = new Match();
    match.id = id;
    match.ageClassId = 1;
    match.groupId = 1;
    match.teamId1 = t1;
    match.teamId2 = t2;
    match.start = moment();
    return match;
}

function newResults(): Result[] {
    const results: Result[] = [];
    results.push(newResult(1, 2, 2));
    results.push(newResult(2, 1, 1));

    results.push(newResult(3, 3, 3));
    results.push(newResult(4, 3, 3));

    results.push(newResult(5, 3, 2));
    results.push(newResult(6, 3, 2));

    return results;
}

function newResults5(): Result[] {
    const results: Result[] = [];
    results.push(newResult(1, 3, 7));
    results.push(newResult(6, 1, 17));
    results.push(newResult(45, 2, 13));
    results.push(newResult(46, 4, 3));
    results.push(newResult(61, 10, 3));
    results.push(newResult(62, 0, 8));
    results.push(newResult(85, 20, 1));
    results.push(newResult(90, 4, 1));
    results.push(newResult(138, 17, 0));
    results.push(newResult(145, 12, 3));

    return results;
}

function newResult(id: number, g1: number, g2: number): Result {
    const result = new Result();
    result.matchId = id;
    result.goals1 = g1;
    result.goals2 = g2;
    result.status = MatchStatus.Played;
    return result;
}
