import { Group } from 'app/models/group';
import { Team } from 'app/models/team';

export class AgeClass {
    public id: number;
    public name: string;
    public groups: Group[] = [];
    public showGroups: boolean;
    teams: Team[] = [];
}
