import { AgeClass } from 'app/models/ageClass';
import { Group } from 'app/models/group';
import { Team } from 'app/models/team';
import { Match } from 'app/models/match';
import { Result } from 'app/models/result';

export class TeamsDataContext {
    public ageClasses: AgeClass[] = [];
    public groups: Group[] = [];
    public teams: Team[] = [];
    public matches: Match[] = [];
    public results: Result[] = [];

    public teamsReady = false;
    public matchesReady = false;
}
