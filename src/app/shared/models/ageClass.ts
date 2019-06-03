import { Group } from './group';
import { Team } from './team';

export class AgeClass {
    public id: number;
    public name: string;
    public groups: Group[] = [];
    public showGroups: boolean;
    teams: Team[] = [];
}
