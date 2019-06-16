import { Group } from './group';
import { Ident } from './ident';
import { Team } from './team';

export class AgeClass {
    public id: string;
    public name: string;
    public groups: Group[] = [];
    public showGroups: boolean;
    teams: Team[] = [];
}

export interface AgeClassDao {
    name: string;
    showGroups: boolean;
}

export interface AgeClassDaoEx extends AgeClassDao, Ident {
}
