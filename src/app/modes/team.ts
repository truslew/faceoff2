import { Group } from './group';
import { Match } from './match';

export class Team {
    public id: number;
    public groupId: number;
    public name: string;
    public ident: string;

    public weight: number;

    public group: Group;

    public matches: Match[];
}
