import { AgeClass } from './ageClass';
import { Group } from './group';
import { Team } from './team';
import { Match } from './match';
import { Result } from './result';

export class TeamsDataContext {
    public ageClasses: AgeClass[] = [];
    public groups: Group[] = [];
    public teams: Team[] = [];
    public matches: Match[] = [];
    public results: Result[] = [];

    public teamsReady = false;
    public matchesReady = false;
}
